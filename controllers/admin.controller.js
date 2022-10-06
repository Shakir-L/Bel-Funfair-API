import dotenv from "dotenv"
dotenv.config()

import {default as AdminService} from "../services/admin.service.js"

export const getAllPermissions = (req,res)=>{
    let id = req.params.id;
    let role = req.params.role;

    let service = new AdminService();
    service.getAllPermissions(id,role,(error,results)=>{
        if(error){return res.status(400).send({success:0,data:error});}
        return res.status(200).send(results)
    });
}