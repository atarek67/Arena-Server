const Course = require("../Models/CourseModel");
class CourseServices{
    constructor(courseName ,courseDuration){
        this.courseName = courseName;
        this.courseDuration = courseDuration;
    }
    static async GetAllCourses(){
        return await Course.find({});
    }
    static async GetCourseByID(id){
        return await Course.findById(id);;
    }
    async AddCourse(){
        var newCourse = new Course({ courseName: this.courseName, courseDuration: this.courseDuration  });
        return await newCourse.save();
    }
    async UpdateCourse(id){
        return await Course.updateOne({_id:id}, {courseName:this.courseName, courseDuration:this.courseDuration});
    }
    static async DeleteCourse(id){
        return await Course.deleteOne({ _id:id});
    }
}
module.exports = CourseServices;