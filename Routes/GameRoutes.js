const express = require("express");
const router = express.Router();
const GameController = require("../Controllers/GameController");
// get all Games
router.get("/",GameController.GetAllGames);
// get Game by id
router.get("/:gameID",GameController.GetGameByID);
// add new Game
router.post("/add",GameController.AddNewGame);
// update Game by id
router.patch("/update/:gameID",GameController.UpdateGame);
// delete Game by id
router.delete("/delete/:gameID",GameController.DeleteGame);
// get all games by field id
router.get("/field/:fieldID",GameController.GetAllGamesByFieldID);
// get all next games by field id
router.get("/field/nextGames/:fieldID",GameController.GetAllNextGamesByFieldID);
// get the uaser his all reservations
router.get("/user/:userID",GameController.GetAllGamesByUserID);
// get the uaser his next games
router.get("/user/nextGames/:userID",GameController.GetAllNextGamesByUserID);
// get the uaser his previous games
router.get("/user/previousGames/:userID",GameController.GetAllPreviousGamesByUserID);
module.exports = router;