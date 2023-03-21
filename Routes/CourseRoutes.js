const express = require("express");
const router = express.Router();
const CourseController = require("../Controllers/CourseController");
// get all courses
router.get("/",CourseController.GetAllCourses)
// get course by id
router.get("/:id",CourseController.GetCourseByID);
// add new course
router.post("/add",CourseController.AddNewCourse);
// update course by id
router.put("/update/:id",CourseController.UpdateCourse);
// delete course by id
router.delete("/delete/:id",CourseController.DeleteCourse);
module.exports = router;