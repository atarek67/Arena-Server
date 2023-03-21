const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");

// login User
router.post("/login",UserController.UserLogin);
// Change User Status
router.patch("/changeStatus/:email",UserController.ChangeUserStatus);
// Reset User Password
router.patch("/resetPassword/:email",UserController.ResetPassword);
// Send Email to Change Password
router.post("/sendEmailToChangePassword/:email",UserController.SendEmailToChangePassword);
// Update User Password
router.patch("/updateUserPassword/:userID",UserController.UpdateUserPassword);
module.exports = router