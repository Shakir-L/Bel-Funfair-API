import UsersService from "../services/users.service.js";
import dotenv from "dotenv"
dotenv.config()

export const home = (req,res)=>{
    let session = req.session;
    if(session.user){ //Authenticated
        res.status(200).render("users/home.handlebars",session.user)
    }else{ // Not Authenticated
        res.redirect("/users/login");
    }
}

export const login = (req,res)=>{
    let session = req.session;
    if(session.user){
        res.locals.flashMessages.success = `Welcome ${session.user.firstname} !`
        res.redirect("/users")
    }else{
        res.render("users/login.handlebars");
    }
}
export const authenticateUser = (req,res)=>{
    let data = {
        firstname: req.body.firstname,
        surname: req.body.surname,
        password: req.body.password
    }
    let service = new UsersService();
    service.authenticate(data, (error,user)=>{
        if(error){
            req.flash("error",error);
            res.redirect("/users/login")
        }else{
            req.flash("success",`Welcome ${user.firstname} !`);
            req.session.user = user;
            res.redirect("/users")
        }
    });
}

export const logout = (req,res)=>{
    req.session.destroy();
    res.redirect("/users/login")
}