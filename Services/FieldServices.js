const Field = require("../Models/FieldModel");
const Game = require("../Models/GameModel");

class FieldServices {
    constructor(fieldName, location, locationOnMap, price, fieldOwnerId, fieldOwnerFullName, rate, valid, createdDate, images) {
        this.fieldName = fieldName;
        this.location = location;
        this.locationOnMap = locationOnMap;
        this.price = price;
        this.fieldOwnerId = fieldOwnerId;
        this.fieldOwnerFullName = fieldOwnerFullName;
        this.rate = rate;
        this.valid = valid;
        this.createdDate = createdDate;
        this.images = images;
    }
    static async GetAllFields() {
        return await Field.find({});
    }
    static async GetFieldByID(fieldID) {
        return await Field.findById(fieldID);
    }
    static async GetFieldAndCalenderByFieldID(fieldID) {
        var date = new Date();
        var month = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var currentDate = `${date.getFullYear()}/${month}/${day}`;
        var field = await Field.findById(fieldID);
        var calender = [];
        var games = await Game.find({ fieldOwnerId: fieldID, date: { $gte: currentDate } });
        if (calender.length == 0) {
            var reservedDate = {};
            reservedDate.date = currentDate;
            var reservedHours = [];
            for (var k = 0; k <= date.getHours(); k++) {
                reservedHours.push(k);
            }
            reservedDate.reservedHours = reservedHours;
            calender.push(reservedDate);
        }
        for (var i = 0; i < games.length; i++) {
            if ((games[i].date == currentDate) && (+games[i].hour > +date.getHours())) {
                calender[0].reservedHours.push(games[i].hour);
            }
            for (var j = 0; j < calender.length; j++) {
                if (calender[j].date == games[i].date && (games[i].date != currentDate)) {
                    calender[j].reservedHours.push(games[i].hour);
                }
            }
            var flag = 1;
            for (var j = 0; j < calender.length; j++) {
                if (calender[j].date == games[i].date) {
                    flag = 0;
                }
            }
            if (flag) {
                var newReservedDate = {};
                newReservedDate.date = games[i].date;
                var newReservedHours = [];
                newReservedHours.push(games[i].hour);
                newReservedDate.reservedHours = newReservedHours;
                calender.push(newReservedDate);
            }
        }
        field = { ...field._doc, calender: calender }
        return field;
    }
    async AddField() {
        var newField = new Field({ fieldName: this.fieldName, location: this.location, locationOnMap: this.locationOnMap, price: this.price, fieldOwnerId: this.fieldOwnerId, fieldOwnerFullName: this.fieldOwnerFullName, rate: this.rate, valid: this.valid, createdDate: this.createdDate, images: this.images });
        if (await newField.save()) {
            return true;
        }
        return false;
    }
    async UpdateField(fieldID) {
        var fieldUpdated = await Field.updateOne({ _id: fieldID }, { fieldName: this.fieldName, location: this.location, locationOnMap: this.locationOnMap, price: this.price, fieldOwnerId: this.fieldOwnerId, fieldOwnerFullName: this.fieldOwnerFullName, valid: "0" })
        if (fieldUpdated.modifiedCount) {
            return true;
        }
        return false;
    }
    static async DeleteField(fieldID) {
        await Game.deleteMany({ fieldId: fieldID });
        var deleted = await Field.deleteOne({ _id: fieldID });
        if (deleted.deletedCount) {
            return true;
        }
        return false;
    }
    static async GetAllFieldsByFieldOwnerID(fieldID) {
        return await Field.find({ fieldOwnerId: fieldID });
    }

    static async GetFieldsByValidation(valid) {
        return await Field.find({ valid: valid })
    }
    static async UpdateFieldStatus(fieldID) {
        var statusUpdated = await Field.updateOne({ _id: fieldID }, { valid: "1" })
        if (statusUpdated.modifiedCount) {
            return true;
        }
        return false;
    }
    static async AddFieldImages(fieldID, images) {
        var imagesUpdated = await Field.updateOne({ _id: fieldID }, { images: images })
        if (imagesUpdated.modifiedCount) {
            return true;
        }
        return false;
    }
    static async DeleteFieldImage(fieldID, imageName) {
        var imagesUpdated = await Field.updateOne(
            { _id: fieldID },
            { $pull: { images: imageName } }
        )
        if (imagesUpdated.modifiedCount) {
            return true;
        }
        return false;
    }
    static async GetFieldImagesByFieldID(fieldID) {
        return await Field.find({ _id: fieldID }, { images: 1 });
    }
}
module.exports = FieldServices;
