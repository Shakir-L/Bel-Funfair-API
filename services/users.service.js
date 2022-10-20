import fs from "fs"
import bcrypt from "bcrypt"

export default class UsersService {
    async loadUsers(){
        try{
            const dataBuffer = fs.readFileSync("api.json");
            let data = JSON.parse(dataBuffer.toString());
            const Users = []
            data.data.users.forEach((user)=>{
                console.log(user)
                Users.push(user);
            });
            return Users;
        }catch (e){console.log(e);return[];}
    }

    async authenticate(data,callback){
        let users = await this.loadUsers()
        const user = users.find((u) =>
            u.firstname.toLowerCase() === data.firstname.toLowerCase() &&
            u.surname.toLowerCase() === data.surname.toLowerCase())
        if (user) {
            bcrypt.compare(data.password,user.password,(err,result)=>{
                if(result){
                    console.log("Valid password !")
                    return callback(null,user);
                }
                console.log("Wrong password !")
                return callback("Password incorrect !");
            });
        } else {
            console.log('User not found!')
            return callback('Firstname or Surname incorrect !');
        }
    }
}