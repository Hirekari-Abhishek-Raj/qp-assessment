import {prisma} from '../../prisma/prismaClient'

export async function addGrocery(req : any,res : any) {    
    const create = await prisma.groceries.create({data: {
        name: req.body.name,
        available_quantity: Number(req.body.quantity),
        hold_quantity: 0,
        price: Number(req.body.price),
        user_id: req.session.user_id
    }})
    return create
}

export async function updateGrocery(req : any,res : any) {
    const update = await prisma.groceries.update({data: req.body,
    where: {
    id: Number(req.params.id)
    }
    })
    return update
}

export async function getGrocery(req : any,res : any,type:Number = 0) {
    let grocery:any
    if(type == 1){
        grocery = await prisma.groceries.findFirst({
            where: {
            name: req.body.name,
        }
        })
    }else{
        grocery = await prisma.groceries.findUnique({
            where: {
            id: Number(req.params.id)
            }
        })
    }

    return grocery
}
export async function allGroceries(req : any,res : any,type:Number = 0) {
    let whereClause:any

    let orderBy = {
        name: 'asc'
    }
    if(req.query.search && req.query.search.length > 0){        
        if(!req.session.is_admin){            
            whereClause = {
                where : {
                    discontinue : false,
                    name: {
                        contains: req.query.search,
                        mode: 'insensitive'
                    }
                },
                orderBy : {
                    name: 'asc'
                }
            }

        }else{
            whereClause = {
                where : {
                    name: {
                        contains: req.query.search,
                        mode: 'insensitive'
                    }
                },
                orderBy : {
                    name: 'asc'
                }
            }
        }
    }else{
        if(!req.session.is_admin){
            whereClause = {
                where : {
                    discontinue : false
                },
                orderBy : {
                    name: 'asc'
                }
            }

        }
    }
    console.log(whereClause);
    
    const grocery = await prisma.groceries.findMany(whereClause)
    return grocery
}

export async function deleteGrocery(req : any,res : any) {
    const update = await prisma.groceries.delete({
    where: {
    id: Number(req.params.id)
    }
    })
    return update
}

export async function getGroceryDetails(id:Number,t:any) {
    let grocery = await t.groceries.findUnique({
        where: {
        id: id
        }
    })

    return grocery
}