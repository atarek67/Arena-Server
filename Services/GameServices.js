const Game = require("../Models/GameModel");
const Field = require("../Models/FieldModel");
class GameServices {
    constructor(userId, userFullName, fieldId, fieldName, date, hour, price, rate, comment, complain) {
        this.userId = userId;
        this.userFullName = userFullName;
        this.fieldId = fieldId;
        this.fieldName = fieldName;
        this.date = date;
        this.hour = hour;
        this.price = price;
        this.rate = rate;
        this.comment = comment;
        this.complain = complain;
    }
    static async GetAllGames() {
        return await Game.find({}).sort({ "date": 1, "hour": 1 });
    }
    static async GetGameByID(gameID) {
        return await Game.findById(gameID);
    }
    async AddGame() {
        var newGame = new Game({ userId: this.userId, userFullName: this.userFullName, fieldId: this.fieldId, fieldName: this.fieldName, date: this.date, hour: this.hour, price: this.price, rate: this.rate, comment: this.comment, complain: this.complain });
        if (await newGame.save()) {
            return true;
        }
        return false;
    }
    static async UpdateGame(gameID, data) {
        var gameUpdated = "";
        if (data.rate) {
            gameUpdated = await Game.updateOne({ _id: gameID }, { rate: data.rate });
        } else if (data.comment) {
            gameUpdated = await Game.updateOne({ _id: gameID }, { comment: data.comment });
        } else {
            gameUpdated = await Game.updateOne({ _id: gameID }, { complain: data.complain });
        }
        if (gameUpdated.modifiedCount) {
            return true;
        } else {
            return false;
        }
    }
    static async DeleteGame(gameID) {
        var deleted = await Game.deleteOne({ _id: gameID });
        if (deleted.deletedCount) {
            return true;
        }
        return false;
    }
    static async UpdateFieldRate(fieldID) {
        var games = await Game.find({ fieldId: fieldID });
        var sum = 0;
        var count = 0;
        var rate = "";
        console.log(games)
        if (games.length > 0) {
            for (var i = 0; i < games.length; i++) {
                if (games[i].rate != "") {
                    sum += +games[i].rate;
                    count++;
                }
            }
            if (!count) {
                rate = "3";
            }
            rate = +(sum / count).toFixed(0);
        } else {
            rate = "3";
        }
        console.log(rate, fieldID, count, sum)
        if (await Field.updateOne({ _id: fieldID }, { rate: rate })) {
            return true;
        } else {
            return false;
        }
    }
    static async GetAllGamesByFieldID(fieldID) {
        return await Game.find({ fieldId: fieldID }).sort({ "date": 1, "hour": 1 });
    }
    static async GetAllNextGamesByFieldID(FieldID) {
        var date = new Date();
        var month = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var currentDate = `${date.getFullYear()}/${month}/${day}`;
        let games = await Game.find({ FieldId: FieldID, $or: [{ date: { $gt: currentDate } }, { $and: [{ date: currentDate }, { hour: { $gt: (date.getHours() + 1) } }] }] }).sort({ "date": 1, "hour": 1 });
        return games;
    }
    static async GetAllGamesByUserID(userID) {
        return await Game.find({ userId: userID }).sort({ "date": -1, "hour": -1 });
    }
    static async GetAllNextGamesByUserID(userID) {
        var date = new Date();
        var month = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var currentDate = `${date.getFullYear()}/${month}/${day}`;
        let games = await Game.find({ userId: userID, $or: [{ date: { $gt: currentDate } }, { $and: [{ date: currentDate }, { hour: { $gt: (date.getHours() + 1) } }] }] }).sort({ "date": 1, "hour": 1 });
        return games;
    }
    static async GetAllPreviousGamesByUserID(userID) {
        var date = new Date();
        var month = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var currentDate = `${date.getFullYear()}/${month}/${day}`;
        let games = await Game.find({ userId: userID, $or: [{ date: { $lt: currentDate } }, { $and: [{ date: currentDate }, { hour: { $lt: (date.getHours() + 1) } }] }] }).sort({ "date": 1, "hour": 1 });
        return games;
    }
}
module.exports = GameServices;