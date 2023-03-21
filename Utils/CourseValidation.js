const Ajv = require("ajv");
var ajv = new Ajv();
const CourseSchema = {
    type:"object",
    properties:{
        courseName:{type:"string",pattern:"^[a-zA-Z]+$"},
        courseDuration:{type:"integer",maximum:30}
    },
    required:["courseName", "courseDuration"],
    additionalProperties:false
}
const CourseValidate = ajv.compile(CourseSchema);

module.exports = CourseValidate;

