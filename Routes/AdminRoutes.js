const express = require("express");
const router = express.Router();
const AdminController = require("../Controllers/AdminController");
// add admin
router.post("/add",AdminController.AddNewAdmin);
module.exports = router;
