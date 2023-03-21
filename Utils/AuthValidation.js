const Ajv = require("ajv");
var ajv = new Ajv();
const AuthSchema = {
    type:"object",
    properties:{
        email:{type:"string", pattern:"^[a-zA-Z0-9?\\.]+\@[a-zA-Z0-9]+(.com)|(.eg)|(.net)|(.org){1}$"},
        userName:{type:"string",pattern:"^[a-zA-Z0-9]+$"},
        password:{type:"string", minLength:5}
    },
    required:["password"],
    additionalProperties:false
}
const AuthValidate = ajv.compile(AuthSchema);

module.exports = AuthValidate;

