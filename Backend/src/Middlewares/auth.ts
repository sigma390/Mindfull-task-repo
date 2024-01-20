import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken'

import {SECRET} from "../Routes/user"
interface CustomRequest extends Request {
    user?: any; // Adjust the type according to your actual user object type
}

export function Authentication(req:any,res:any,next:any) {
    let authHead = req.headers.auth;
    if (authHead) {
        const token = authHead.split(' ')[1]
        jwt.verify(token,SECRET,(err:any,user:any)=>{
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
    });
}
else{
    res.sendStatus(401);
}}
