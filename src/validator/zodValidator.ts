import {type ZodType } from 'zod';
import type { Request, Response, NextFunction } from "express";
export const validator= (
    schema: ZodType<any>
)=>(req: Request, res: Response, next: NextFunction)=>{
    try{
        schema.parse({...req.body});
        next();
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "invalid request params recieved",
            data:{},
            error: err
        })
    }

}