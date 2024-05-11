import { prisma } from "../../prisma/prismaClient";
import { successResponse,errorResponse } from "../helpers";
import { addQuantity,removeQuantity } from "../helpers/quantity";
import { getGroceryDetails } from "../services/groceries.service";
import { addItem,removeItem,getItem,getItems,updateItem } from "../services/tempItems.service";


export async function addItems(req:any,res:any) {
    try {
        const result = await prisma.$transaction(async (t) => {
            const grocery_id:Number = req.body.grocery_id
            const qty:Number = req.body.quantity
            const grocery = await getGroceryDetails(grocery_id,t)
            if(grocery.available_quantity < qty){
                throw new Error(`Available Quantity is ${grocery.available_quantity}`)
            }
            const removeQty = await removeQuantity(grocery_id,qty,'available',t)
            const body = {
                grocery_id: grocery_id,
                user_id: req.session.user_id,
                quantity: qty,
                price: grocery.price,
                value: Number(qty) * grocery.price
            }
            const addToCart = await addItem(body,t)
            return addToCart
        })
        return successResponse(req,res,result)
    } catch (error:any) {
        return errorResponse(req,res,error.message)
    }
}

export async function removeItems(req:any,res:any) {
    try {
        const result = await prisma.$transaction(async (t) => {
            const item = await getItem(req.params.id,t)
            if(item?.grocery_id) {
            const addQty = await addQuantity(item.grocery_id,item.quantity,t)
            const removeFromCart = await removeItem(req.params.id,t)
            return removeFromCart
        }
        return 0
        })
        return successResponse(req,res,result)
    } catch (error:any) {
        return errorResponse(req,res,error.message)
    }
}

export async function updateItems(req:any,res:any) {
    try {
        const result = await prisma.$transaction(async (t) => {
            const item = await getItem(req.params.id,t)
            const addQty = await addQuantity(item?.grocery_id,item.quantity,t)
            const grocery = await getGroceryDetails(req.body?.grocery_id,t)
            const qty = req.body.quantity
            if(grocery.available_quantity < qty){
                throw new Error(`Available Quantity is ${grocery.available_quantity}`)
            }
            const removeQty = await removeQuantity(req.body?.grocery_id,qty,'available',t)
            const body = {
                grocery_id: req.body?.grocery_id,
                user_id: req.session.user_id,
                quantity: qty,
                price: grocery.price,
                value: Number(qty) * grocery.price
            }
            const updateCart = await updateItem(req.params.id,body,t)
            return updateCart
        })
        return successResponse(req,res,result)
    } catch (error:any) {
        return errorResponse(req,res,error.message)
    }
}

export async function cartItems(req:any,res:any) {
    try {
        const items = await getItems(req.session.user_id)
        return successResponse(req,res,items)
    } catch (error:any) {
        return errorResponse(req,res,error.message)
    }
}