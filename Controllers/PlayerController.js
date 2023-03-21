const PlayerValidate = require("../Utils/PlayerValidation");
const PlayerServices = require("../Services/PlayerServices");
const bcrypt = require("bcrypt");

var GetAllPlayers = async (req, res) => {
    res.status(200).json(await PlayerServices.GetAllPlayers());
};
var GetPlayerByID = async (req, res) => {
    res.status(200).json(await PlayerServices.GetPlayerByID(req.params.playerID));
};
var AddNewPlayer = async (req, res) => {
    if (PlayerValidate(req.body)) {
        // console.log(req.body);

        var HashedPassword = await bcrypt.hash(req.body.password, 10);
        var date = new Date();
        var month = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var currentDate = `${date.getFullYear()}/${month}/${day}`;
        var newPlayer = new PlayerServices(req.body.fullName, req.body.phone, req.body.birthDate, req.body.location, req.body.email, req.body.userName, HashedPassword, "Player", "Pending", currentDate, "PlayerDefaultPicture.png");
        // console.log(newPlayer);
        var addedPlayer = await newPlayer.AddPlayer();
        if (addedPlayer == true) {
            res.status(201).send("Add Successfully !");
        } else if (addedPlayer === "username or email already taken") {
            res.status(400).send("username or email already taken");
        } else {
            res.status(400).send("not added");
        }
    } else {
        res.status(400).send("Validation Not Added !");
        console.log(PlayerValidate.errors);

    }
};
var UpdatePlayer = async (req, res) => {
    var updatedPlayer = new PlayerServices(req.body.fullName, req.body.phone, req.body.birthDate, req.body.location, req.body.email, req.body.userName);
    if (PlayerValidate(updatedPlayer)) {
        if (await updatedPlayer.UpdatePlayer(req.params.playerID)) {
            res.status(200).send("Updated Successfully !");
        } else {
            res.status(400).send("Not Updated !");
        }
    } else {
        res.status(400).send("Validation Not Added !");
        console.log(PlayerValidate.errors);
    }
};
var DeletePlayer = async (req, res) => {
    if (await PlayerServices.DeletePlayer(req.params.playerID)) {
        res.status(201).send("Deleted Successfully !");
    } else {
        res.status(400).send("Not Deleted !");
    }
};
var UpdatePlayerImage = async (req, res) => {
    var updatedPlayer = await PlayerServices.UpdatePlayerImage(req.params.playerID, req.file.filename)
    if (updatedPlayer) {
        res.status(200).json(updatedPlayer);
    } else {
        res.status(400).send("Not Updated !");
    }
};
module.exports = {
    GetAllPlayers,
    GetPlayerByID,
    AddNewPlayer,
    UpdatePlayer,
    DeletePlayer,
    UpdatePlayerImage
};