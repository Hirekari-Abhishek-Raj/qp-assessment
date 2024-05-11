import { prisma } from "../../prisma/prismaClient";

export async function removeQuantity(grocery_id:Number,qty:Number,type:string,t:any) {
    if(type == 'hold'){
        const remove = await t.groceries.update({
            data: {
                hold_quantity: {
                    decrement: qty
                }
            },
            where: {
                id: grocery_id
            }
        })
        return remove
    }else{
        const remove = await t.groceries.update({
            data: {
                available_quantity: {
                    decrement: qty
                },
                hold_quantity: {
                    increment: qty
                }
            },
            where: {
                id: grocery_id
            }
        })
        return remove
    }
}

export async function addQuantity(grocery_id:Number,qty:Number,t:any) {
    const add = await t.groceries.update({
        data: {
            available_quantity: {
                increment: qty
            },
            hold_quantity: {
                decrement: qty
            }
        },
        where: {
            id: grocery_id
        }
    })
    return add
}