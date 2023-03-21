const express = require("express");
const router = express.Router();
const FieldOwnerController = require("../Controllers/FieldOwnerController");
const Multer= require("../Services/multer")
const multerPath = Multer.multerPath;
const multerValidators= Multer.multerValidators;
const HMR= Multer.HMR;
const myMulter= Multer.myMulter;

// get all FieldOwners
router.get("/",FieldOwnerController.GetAllFieldOwners)
// get FieldOwner by id
router.get("/:fieldOwnerID",FieldOwnerController.GetFieldOwnerByID);
// add new FieldOwner
router.post("/add",FieldOwnerController.AddNewFieldOwner);
// update FieldOwner by id
router.patch("/update/:fieldOwnerID",FieldOwnerController.UpdateFieldOwner);
// delete FieldOwner by id
router.delete("/delete/:fieldOwnerID",FieldOwnerController.DeleteFieldOwner);
// update FieldOwner image
router.post("/updateFieldOwnerImage/:fieldOwnerID",myMulter(multerPath.fieldOwnerProfilePic , multerValidators.image).single('image'),HMR,FieldOwnerController.UpdateFieldOwnerImage);

module.exports = router;