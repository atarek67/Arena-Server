const express = require("express");
const router = express.Router();
const PlayerController = require("../Controllers/PlayerController");
const Multer= require("../Services/multer")
const multerPath = Multer.multerPath;
const multerValidators= Multer.multerValidators;
const HMR= Multer.HMR;
const myMulter= Multer.myMulter;


// get all Players
router.get("/",PlayerController.GetAllPlayers)
// get Player by id
router.get("/:playerID",PlayerController.GetPlayerByID);
// add new Player
router.post("/add",PlayerController.AddNewPlayer);
// update Player by id
router.patch("/update/:playerID",PlayerController.UpdatePlayer);
// delete Player by id
router.delete("/delete/:playerID",PlayerController.DeletePlayer);
// update Player image
router.post("/updatePlayerImage/:playerID",myMulter(multerPath.playerProfilePic , multerValidators.image).single('image'),HMR,PlayerController.UpdatePlayerImage);

module.exports = router;