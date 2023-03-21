const AuthValidation = require("../Utils/AuthValidation");
const UserServices = require("../Services/UserServices");
const bcrypt= require("bcrypt");

var UserLogin = async (req, res)=>{
    var userData = req.body;
    if(AuthValidation(userData)){
        const token = await UserServices.LoginUser(userData);
        if(token){
            console.log(token);
            res.header("X-Auth-Token", token);
            res.status(200).send({message: "Logged In Successfully" , token : token});
        }else{
            res.status(400).send("Not Logged in");
        }
    }else{
        res.status(400).send("Not Valid !");
    }
}
var ChangeUserStatus = async (req, res)=>{
    if(await UserServices.ChangeUserStatus(req.params.email)){
        res.status(201).send("Status Updated Successfully !");
    }else{
        res.status(400).send("Not Updated !");
    }
};
var ResetPassword = async (req, res)=>{
    var HashedPassword = await bcrypt.hash(req.body.password,10);
    if(await UserServices.ResetPassword(req.params.email,HashedPassword)){
        res.status(201).send("password Updated Successfully !");
    }else{
        res.status(400).send("Not Updated !");
    }
};
var SendEmailToChangePassword = async (req, res)=>{
    if(await UserServices.SendEmailToChangePassword(req.params.email)){
        res.status(201).send("sent it Successfully !");
    }else{
        res.status(400).send("Not sent !");
    }
};
var UpdateUserPassword = async (req, res)=>{
    var HashedPassword = await bcrypt.hash(req.body.newPassword,10);
    if(await UserServices.UpdateUserPassword(req.params.userID,req.body.oldPassword,HashedPassword)){
        res.status(201).send("password Updated Successfully !");
    }else{
        res.status(400).send("Not Updated !");
    }
};
module.exports = {
    UserLogin,
    ChangeUserStatus,
    ResetPassword,
    SendEmailToChangePassword,
    UpdateUserPassword
}