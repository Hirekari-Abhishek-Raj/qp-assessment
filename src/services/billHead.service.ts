import { prisma } from "../../prisma/prismaClient";

export async function getLatestBill(user_id:any,t:any) {
    const bill = await t.bill_head.findFirst({
        where: {
            user_id: user_id
        },
        orderBy: {
            id: 'desc'
        }
    })
    return bill
}

export async function createBillHead(body:any,t:any) {
    const bill = await t.bill_head.create({
        data: body
    })
    return bill
}

export async function getBills(user_id:any,page:number = 1,query?:any) {
    let whereClause = {}
    if(query){
        whereClause = {
            user_id: user_id,
            entry_number: {
                contains: query
            }
        }
    }else{
        whereClause = {
            user_id: user_id,
        }
    }
    const bill = await prisma.bill_head.findMany({
        where: whereClause,
        orderBy: {
            entry_number: 'desc'
        },
        skip: (page - 1)*50,
        take: 50
    })
    return bill
}

export async function getBill(id:any) {
    const bill = await prisma.bill_head.findMany({
        where: {
            id: Number(id)
        },
        include: {
          bill_items: {
            include: {
                grocery: {
                    select: {
                        name: true
                    }
                }
              }
          },

        },    
    })
    return bill
}