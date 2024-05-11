import * as userSevice from '../services/users.service'
import {successResponse,errorResponse} from '../helpers/index'
import {encrypt,decrypt} from "../helpers/encryption";
import { generateToken } from '../helpers/authentication';
export async function addUser(req : any,res : any) {
    try {
        const getUser = await userSevice.getUser(req,res,1)
        if(getUser){
            throw new Error(`Name already taken by someone else\nPlease choose another name!`)
        }
        req.body.password = await encrypt(req.body.password)        
        const create = await userSevice.addUser(req,res)
        return successResponse(req,res,create)
    } catch (error: any) {
        return errorResponse(req,res,error.message)
    }
}

export async function updateUser(req : any,res : any) {
try {
    if(req.body.password){
        req.body.password = await encrypt(req.body.password)
    }
    const update = await userSevice.updateUser(req,res)
    return successResponse(req,res,update)
} catch (error: any) {
    return errorResponse(req,res,error.message)

}
}
export async function getUser(req : any,res : any) {
    try {
        const getUser = await userSevice.getUser(req,res)
        return successResponse(req,res,getUser)
    } catch (error:any) {
        return errorResponse(req,res,error.message)
    }
}
export async function allUsers(req : any,res : any) {
    try {        
        const users = await userSevice.allUsers(req,res)
        return successResponse(req,res,users)
    } catch (error:any) {
        return errorResponse(req,res,error.message)
    }
}
export async function login(req : any,res : any) {
    try {
        const getUser = await userSevice.getUser(req,res,1)
        if(getUser){            
            const password = await decrypt(getUser?.password)
            if(req.body.password != password){
                throw new Error("Invalid Password")
            }else{
                delete getUser["password"]
                const token = await generateToken(getUser)
                getUser["token"] = token
            }
        }else{
            throw new Error("Invalid Username")
        }
        return successResponse(req,res,getUser)
    } catch (error:any) { 
        console.log(error);
               
        return errorResponse(req,res,error.message)
    }
}