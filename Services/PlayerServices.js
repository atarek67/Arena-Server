const Player = require("../Models/PlayerModel");
const FieldOwner = require("../Models/FieldOwnerModel");
const Game = require("../Models/GameModel");
const UserServices = require("./UserServices");
const nodemailer = require("../Configiration/nodeMailer.config");
class PlayerServices extends UserServices {
    constructor(fullName, phone, birthDate, location, email, userName, password, role, status, createdDate, image) {
        super(fullName, phone, email, userName, password, role, status, createdDate, image);
        this.birthDate = birthDate;
        this.location = location;
    }
    static async GetAllPlayers() {
        return await Player.find({}, { password: 0 });
    }
    static async GetPlayerByID(playerID) {
        return await Player.findOne({ _id: playerID }, { password: 0 });
    }
    async AddPlayer() {
        var newPlayer = new Player({ fullName: this.fullName, phone: this.phone, birthDate: this.birthDate, location: this.location, email: this.email, userName: this.userName, password: this.password, role: this.role, status: this.status, createdDate: this.createdDate, image: this.image });
        var Models = [Player, FieldOwner];

        for (var i = 0; i < Models.length; i++) {
            var foundPlayer = await Models[i].find({ $or: [{ userName: newPlayer.userName }, { email: newPlayer.email }] });
            console.log(foundPlayer);
            console.log(foundPlayer.length);
            if (foundPlayer.length == 1) {
                break;
            }
        }
        if (foundPlayer.length === 0) {

            await newPlayer.save();
            nodemailer.sendConfirmationEmail(this.fullName, this.email)
            return true;

        } else {
            return "username or email already taken";
        }
    }
    async UpdatePlayer(playerID) {
        var playerUpdated = await Player.updateOne({ _id: playerID }, { fullName: this.fullName, phone: this.phone, birthDate: this.birthDate, location: this.location, email: this.email, userName: this.userName });
        if (playerUpdated.modifiedCount) {
            return true;
        }
        return false;
    }
    static async DeletePlayer(playerID) {
        await Game.deleteMany({ userId: playerID });
        var deleted = await Player.deleteOne({ _id: playerID });
        if (deleted.deletedCount) {
            return true;
        }
        return false;
    }
    static async UpdatePlayerImage(playerID, image) {
        var updatedPlayer = await Player.findOneAndUpdate({ _id: playerID }, { image: image }, { new: true });
        if (updatedPlayer) {
            return updatedPlayer;
        }
        return false;
    }
}
module.exports = PlayerServices;