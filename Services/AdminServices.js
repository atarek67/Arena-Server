const Admin = require("../Models/AdminModel");
class AdminServices{
    constructor(adminName,userName,password){
        this.adminName=adminName;
        this.userName=userName;
        this.password=password;
    }
    async AddAdmin(){
        var newAdmin = new Admin({ adminName: this.adminName, userName: this.userName, password: this.password, role: this.role});
        if(await newAdmin.save()){
            return true;
        }
        return false;
    }
}
module.exports = AdminServices;