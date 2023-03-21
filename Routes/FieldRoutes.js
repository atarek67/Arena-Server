const express = require("express");
const router = express.Router();
const Multer= require("../Services/multer")
const multerPath = Multer.multerPath;
const multerValidators= Multer.multerValidators;
const HMR= Multer.HMR;
const myMulter= Multer.myMulter;

const FieldController = require("../Controllers/FieldController");
// get all Fields
router.get("/",FieldController.GetAllFields)
// get Field by id
router.get("/:fieldID",FieldController.GetFieldByID);
// get Field and calender by field id
router.get("/calender/:fieldID",FieldController.GetFieldAndCalenderByFieldID);
// add new Field
router.post("/add",myMulter(multerPath.fieldPic, multerValidators.image).array('image',5),HMR,FieldController.AddNewField);
// update Field by id
router.patch("/update/:fieldID",FieldController.UpdateField);
// delete Field by id
router.delete("/delete/:fieldID",FieldController.DeleteField);
// add field images
router.post("/addFieldImages/:fieldID",myMulter(multerPath.fieldPic, multerValidators.image).array('image',5),HMR,FieldController.AddFieldImages);
// delete field image
router.delete("/deleteFieldImage/:fieldID/:imageName",FieldController.DeleteFieldImage);
// get all vaild/invalid fields
router.get("/valid/:valid",FieldController.GetFieldsByValidation);
// get all vaild fields
router.get("/fieldOwner/:fieldOwnerID",FieldController.GetAllFieldsByFieldOwnerID);
// update field status
router.patch("/updateFieldStatus/:fieldID",FieldController.UpdateFieldStatus);

module.exports = router;