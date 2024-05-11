import { prisma } from "../../prisma/prismaClient";

export async function addItem(body:any,t:any) {
    const addItem = await t.temp_items.create({
        data: body
    })
    return addItem
}
export async function updateItem(id:Number,body:any,t:any) {
    const updateItem = await t.temp_items.update({
        data: body,
        where: {
            id: Number(id)
        }
    })
    return updateItem
}

export async function removeItem(id:Number,t:any) {
    const addItem = await t.temp_items.delete({
        where: {
            id: Number(id)
        }
    })
    return addItem
}

export async function getItem(id:Number,t:any) {
    const item = await t.temp_items.findUnique({
        where: {
            id: Number(id)
        }
    })
    return item
}

export async function getItems(user_id:any) {
    const items = await prisma.temp_items.findMany({
        where: {
            user_id: user_id
        },
        include: {
            grocery: {
                select: {
                    name: true
                }
            }
        },
    })
    return items
}

export async function deleteItems(id:Number,t:any) {
    const removeItem = await t.temp_items.deleteMany({
        where: {
            user_id: Number(id)
        }
    })
    return removeItem
}