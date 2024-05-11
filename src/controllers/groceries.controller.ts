import { successResponse,errorResponse } from "../helpers";
import * as groceriesService from '../services/groceries.service'

export async function addGroceries(req:any,res:any) {
    try {
        if(req.body.quantity == 0 || req.body.price == 0){
            throw new Error('Quantity and price cannot be zero')
        }
        const create = await groceriesService.addGrocery(req,res)
        return successResponse(req,res,create)
    } catch (error:any) {
        return errorResponse(req,res,error.message)
    }
}

export async function updateGroceries(req:any,res:any) {
    try {
        req.body.available_quantity = req.body.quantity
        delete req.body.quantity
        const create = await groceriesService.updateGrocery(req,res)
        return successResponse(req,res,create)
    } catch (error : any) {
        return errorResponse(req,res,error.message)
    }
}

export async function getGrocery(req : any,res : any) {
    try {
        const getGrocery = await groceriesService.getGrocery(req,res)
        return successResponse(req,res,getGrocery)
    } catch (error:any) {
        return errorResponse(req,res,error.message)
    }
}

export async function allGrocery(req : any,res : any) {
    try {
        const getGrocery = await groceriesService.allGroceries(req,res)
        return successResponse(req,res,getGrocery)
    } catch (error:any) {
        return errorResponse(req,res,error.message)
    }
}

export async function deleteGrocery(req:any,res:any) {
    try {
        const create = await groceriesService.deleteGrocery(req,res)
        return successResponse(req,res,create)
    } catch (error : any) {
        return errorResponse(req,res,error.message)
    }
}