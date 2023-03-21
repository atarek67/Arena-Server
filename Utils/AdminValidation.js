const Ajv = require("ajv");
var ajv = new Ajv();
const AdminSchema = {
    type:"object",
    properties:{
        adminName:{type:"string",pattern:"^[a-zA-Z\s\.]*$" },
        userName:{type:"string"},
        password:{type:"string",minLength:5 },
        role:{type:"string"}
    },
    required:["adminName","userName","password","role"],
    additionalProperties:false
}
const AdminValidate = ajv.compile(AdminSchema);

module.exports = AdminValidate;

