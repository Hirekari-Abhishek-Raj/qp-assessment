import { prisma } from "../../prisma/prismaClient";
import { successResponse,errorResponse } from "../helpers";
import { addQuantity,removeQuantity } from "../helpers/quantity";
import moment from "moment";
import {generateNextBillNumber} from '../helpers/billNumber'
import { getItems } from "../services/tempItems.service";
import { getLatestBill,createBillHead,getBills,getBill } from "../services/billHead.service";
import { bulkCreateItems } from "../services/billItems.service";
import { deleteItems } from "../services/tempItems.service";

export async function submitOrder(req:any,res:any) {
    try {
        const result = await prisma.$transaction(async (t) => {
            let entry_number 
            const entry_date = moment().format('YYYY-MM-DD')
            const bill = await getLatestBill(req.session.user_id,t)
            if(bill){
                entry_number = await generateNextBillNumber(bill?.entry_number)

            }else{
                entry_number = await generateNextBillNumber()
            }            
            const items = await getItems(req.session.user_id)
            const net_amount:any = items.reduce( function(a, b){
                return a + b['value'];
            }, 0);
            const body = {
                entry_number: entry_number,
                entry_date: entry_date,
                user_id: req?.session?.user_id,
                net_amount: net_amount
            }
            const head = await createBillHead(body,t)
            let bill_items = []
            for(let i = 0 ; i < items?.length ; i++){
                const removeQty = await removeQuantity(items[i]?.grocery_id,items[i]?.quantity,'hold',t)
                bill_items.push({
                    header_id: head?.id,
                    price: items[i]?.price,
                    value: items[i]?.value,
                    grocery_id: items[i]?.grocery_id,
                    quantity: items[i]?.quantity,
                })
            }
            const createItems = await bulkCreateItems(bill_items,t)
            const removeTempItems = await deleteItems(req.session.user_id,t)
            return head
        })
        return successResponse(req,res,result)
    } catch (error:any) {
        return errorResponse(req,res,error.message)
    }
}

export async function getAllBills(req:any,res:any) {
    try {
        const page = req.query.page || 1
        let bills
        if(req.query.search){
            bills = await getBills(req.session.user_id,page,req.query.search)
        }else{
            bills = await getBills(req.session.user_id,page)
        }
        return successResponse(req,res,bills)
    } catch (error:any) {
        return errorResponse(req,res,error.message)
    }
    
}
export async function getBillDetails(req:any,res:any) {
    try {
        const bill = await getBill(req.params.id)
        return successResponse(req,res,bill)
    } catch (error:any) {
        return errorResponse(req,res,error.message)
    }
    
}