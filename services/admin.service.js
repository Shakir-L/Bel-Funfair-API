import fs from "fs"

export default class AdminService {
    async getAllPermissions(id, role, callback) {
        let data = await this.loadData()
        let User = {};
        data.forEach((user)=>{
            if(user.id === id && user.role === role)
                User = user
        });
        if(User !== {})
            return callback(null,User)
        else
            return callback([])
    }
    async loadData(){
        try{
            const dataBuffer = fs.readFileSync("api.json");
            let data = JSON.parse(dataBuffer.toString());
            const Data = []
            for(let i=0; i<data.users.length; i++) {
                Data.push(data.users[i]);
            }
            return Data;
        }catch (e){console.log(e);return[];}
    }
}