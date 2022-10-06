import {default as AdminService} from "../services/admin.service.js"
import validator from "validator";

export const validatePermissions = async (req,res,next)=>{
    let role = req.params.role;
    let id = req.params.id;

    let service = new AdminService();
    let isValid = false;
    let error = {error:[{message: ""}]};

    if(validator.isInt(id) && isNaN(role)){
        const users = await service.loadData()
        let tab = []
        users.forEach((user)=>{
            tab.push([user.role,user.id])
        })
        tab.forEach((element)=>{
            if(JSON.stringify(element) === JSON.stringify([role,id])){
                isValid = true
            }
        })
        error.error.message = "Role or Id is incorrect!"

    }else
        error.error.message = "Role must be string value and ID must be integer value!"

    if(isValid){next();}
    else{res.status(400).render("error404.handlebars", error)}
}
