const Player = require("../Models/PlayerModel");
const FieldOwner = require("../Models/FieldOwnerModel");
const Admin = require("../Models/AdminModel");
const nodemailer = require("../Configiration/nodeMailer.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Models = [Player, FieldOwner, Admin]
class UserServices {
    constructor(fullName, phone, email, userName, password, role, status, createdDate, image) {
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.status = status;
        this.createdDate = createdDate;
        this.image = image;
    }
    static async LoginUser(userData) {
        var foundUser;
        var token;
        for (var i = 0; i < Models.length; i++) {
            if (userData.userName) {
                foundUser = await Models[i].findOne({ userName: userData.userName }).exec();
                if (foundUser) {
                    if (foundUser.status == "Active") {
                        if (await bcrypt.compare(userData.password, foundUser.password)) {
                            console.log("-- Done -- username is true & password is true");
                            if (Models[i] == Player) {
                                token = jwt.sign({
                                    userID: foundUser._id,
                                    fullName: foundUser.fullName,
                                    phone: foundUser.phone,
                                    birthDate: foundUser.birthDate,
                                    location: foundUser.location,
                                    email: foundUser.email,
                                    userName: foundUser.userName,
                                    role: foundUser.role,
                                    status: foundUser.status,
                                    createdDate: foundUser.createdDate,
                                    image: foundUser.image
                                },
                                    "Arena-Field-Sercret-Very-67");
                                return token;
                            } else if (Models[i] == FieldOwner) {
                                token = jwt.sign({
                                    userID: foundUser._id,
                                    fullName: foundUser.fullName,
                                    phone: foundUser.phone,
                                    email: foundUser.email,
                                    userName: foundUser.userName,
                                    role: foundUser.role,
                                    status: foundUser.status,
                                    createdDate: foundUser.createdDate,
                                    image: foundUser.image
                                },
                                    "Arena-Field-Sercret-Very-67");
                                return token;
                            } else {
                                token = jwt.sign({
                                    userID: foundUser._id,
                                    userName: foundUser.userName,
                                    role: foundUser.role
                                },
                                    "Arena-Field-Sercret-Very-67 ")
                                return token;
                            }
                        } else {
                            console.log(" -- Unfortunately -- username is true but password is false");
                            return false;
                        }
                    } else {
                        console.log("The User is not Active");
                        return false;
                    }

                }
            } else if (userData.email) {
                foundUser = await Models[i].findOne({ email: userData.email }).exec();
                console.log(foundUser);
                console.log(userData);
                if (foundUser) {
                    if (foundUser.status == "Active") {
                        if (await bcrypt.compare(userData.password, foundUser.password)) {
                            console.log("-- Done -- email is true & password is true");
                            if (Models[i] == Player) {
                                token = jwt.sign({
                                    userID: foundUser._id,
                                    fullName: foundUser.fullName,
                                    phone: foundUser.phone,
                                    birthDate: foundUser.birthDate,
                                    location: foundUser.location,
                                    email: foundUser.email,
                                    userName: foundUser.userName,
                                    role: foundUser.role,
                                    status: foundUser.status,
                                    createdDate: foundUser.createdDate,
                                    image: foundUser.image
                                },
                                    "Arena-Field-Sercret-Very-67");
                                return token;
                            } else if (Models[i] == FieldOwner) {
                                token = jwt.sign({
                                    userID: foundUser._id,
                                    fullName: foundUser.fullName,
                                    phone: foundUser.phone,
                                    email: foundUser.email,
                                    userName: foundUser.userName,
                                    role: foundUser.role,
                                    status: foundUser.status,
                                    createdDate: foundUser.createdDate,
                                    image: foundUser.image
                                },
                                    "Arena-Field-Sercret-Very-67");
                                return token;
                            } else {
                                token = jwt.sign({
                                    userID: foundUser._id,
                                    userName: foundUser.userName,
                                    role: foundUser.role
                                },
                                    "Arena-Field-Sercret-Very-67")
                                return token;
                            }
                        } else {
                            console.log("-- Unfortunately --  email is true but password is false");
                            return false;
                        }
                    } else {
                        console.log("The User is not Active");
                        return false;
                    }
                }

            } else {
                return false;
            }
        }
    }
    static async ChangeUserStatus(email) {
        var flag = false;
        for (var i = 0; i < Models.length; i++) {
            var result = await Models[i].updateOne({ email: email }, { status: 'Active' })
            if (result.modifiedCount == 1) {
                flag = true;
            }
        }
        return flag;
    }

    static async ResetPassword(email, password) {
        for (var i = 0; i < Models.length; i++) {
            var updatePassword=await Models[i].updateOne({ email: email }, { password: password })
            if (updatePassword.modifiedCount ==1) {
                return true;
            }
        }
        return false;
    }
    static SendEmailToChangePassword(email) {
        nodemailer.sendEmailToResetPassword(email);
        return true;
    }
    static async UpdateUserPassword(userID, oldPassword, newPassword) {
        var foundUser;
        var flag = false;
        var result;
        console.log(oldPassword, newPassword)
        for (var i = 0; i < Models.length; i++) {
            foundUser = await Models[i].findOne({ _id: userID }, { password: 1, role: 1 });
            if (foundUser) {
                if (bcrypt.compare(oldPassword, foundUser.password)) {
                    if (foundUser.role == "Player") {
                        result = await Player.updateOne({ _id: userID }, { password: newPassword });
                    } else if (foundUser.role == "Player") {
                        result = await FieldOwner.updateOne({ _id: userID }, { password: newPassword });
                    } else {
                        result = await Admin.updateOne({ _id: userID }, { password: newPassword });
                    }
                    if (result.modifiedCount == 1) {
                        flag = true;
                    }
                } else {
                    return false;
                }
            }
        }
        return flag;
    }
}
module.exports = UserServices;