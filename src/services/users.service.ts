import {prisma} from '../../prisma/prismaClient'

export async function addUser(req : any,res : any) {
    const create = await prisma.users.create({data: {
        name: req.body.name,
        password: req.body.password,
        is_admin: req.body.is_admin || false
    }})
    return create
}

export async function updateUser(req : any,res : any) {
    const update = await prisma.users.update({data: req.body,
    where: {
    id: Number(req.params.id)
    }
    })
    return update
}
export async function getUser(req : any,res : any,type:Number = 0) {
    let user:any
    if(type == 1){
        user = await prisma.users.findFirst({
            where: {
            name: req.body.name,
        }
        })
    }else{
        user = await prisma.users.findUnique({
            where: {
            id: Number(req.params.id)
            }
            })
    }

    return user
}
export async function allUsers(req : any,res : any) {
    const users = await prisma.users.findMany({orderBy:[{ id: 'desc'}]})
    return users
}
