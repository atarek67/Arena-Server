const FieldOwner = require("../Models/FieldOwnerModel");
const Field = require("../Models/FieldModel");
const Game = require("../Models/GameModel");
const Player = require("../Models/PlayerModel");
const UserServices = require("./UserServices");
const nodemailer = require("../Configiration/nodeMailer.config");

class FieldOwnerServices extends UserServices{
    constructor(fullName,phone,email,userName,password,role,status,createdDate,image){
        super(fullName,phone,email,userName,password,role,status,createdDate,image);
    }
    static async GetAllFieldOwners(){
        return await FieldOwner.find({}, {password:0});
    }
    static async GetFieldOwnerByID(fieldOwnerID){
        return await FieldOwner.findOne({_id:fieldOwnerID},{password:0});
    }
    async AddFieldOwner(){
        var newFieldOwner = new FieldOwner({ fullName: this.fullName, phone: this.phone, email: this.email, userName: this.userName, password: this.password, role:this.role, status:this.status, createdDate:this.createdDate, image: this.image});
        var Models = [Player, FieldOwner];
        var foundFieldOwner = "";
        for(var i=0; i<Models.length ; i++){
            foundFieldOwner = await Models[i].find({$or:[{userName:newFieldOwner.userName},{email:newFieldOwner.email}]}).exec();
            if(foundFieldOwner.length==1){
                break;
            }

        }
        if(foundFieldOwner.length==0){
            await newFieldOwner.save();
            nodemailer.sendConfirmationEmail(this.fullName,this.email);
            return true;
        }else{
            return "username or email already taken"
        }
    }
    async UpdateFieldOwner(fieldOwnerID){
        var fieldOwnerUpdated = await FieldOwner.updateOne({_id:fieldOwnerID}, {fullName: this.fullName, phone: this.phone,email: this.email, userName: this.userName});
        if(fieldOwnerUpdated.modifiedCount){
            return true;
        }
        return false;
    }
    static async DeleteFieldOwner(fieldOwnerID){
        await Field.deleteMany({fieldOwnerId:fieldOwnerID});
        await Game.deleteMany({userId:fieldOwnerID});
        var deleted = await FieldOwner.deleteOne({_id:fieldOwnerID});
        if(deleted.deletedCount){
            return true;
        }
        return false;
    }
    static async UpdateFieldOwnerImage(fieldOwnerID,image){
        var fieldOwnerUpdated = await FieldOwner.findOneAndUpdate({_id:fieldOwnerID}, {image:image}, {new:true})
        if(fieldOwnerUpdated){
            return fieldOwnerUpdated;
        }else{
            return false;
        }
    }
    
}
module.exports = FieldOwnerServices;