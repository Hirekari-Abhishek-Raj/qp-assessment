import { prisma } from "../../prisma/prismaClient";

export async function bulkCreateItems(body:any,t:any) {
    const create = await t.bill_items.createMany({
        data: body
    })
}