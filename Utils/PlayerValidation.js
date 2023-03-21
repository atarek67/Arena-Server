const Ajv = require("ajv");
var ajv = new Ajv();
const PlayerSchema = {
    type:"object",
    properties:{
        fullName:{type:"string",pattern:"^[a-zA-Z+?\\s]{3,25}$"},
        phone:{type:"string",pattern:"^01[0125][0-9]{8}$"},
        birthDate:{type:"string",pattern:"(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[469]|11)[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[13578]|1[02])[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))"},
        location:{type:"string",pattern:"^[a-zA-Z?\\s]+$"},
        email:{type:"string", pattern:"^[a-zA-Z0-9?\\.]+\@[a-zA-Z0-9]+(.com)|(.eg)|(.net)|(.org){1}$"},
        userName:{type:"string" , pattern : "^[a-zA-Z0-9]{3,25}$"},
        password:{type:"string", minLength:8 , pattern :"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"},
        role:{type:"string",pattern:"^[a-zA-Z\\s]+$"},
        status:{type:"string",pattern:"^[a-zA-Z\\s]+$"},
        createdDate:{type:"string",pattern:"(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[469]|11)[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[13578]|1[02])[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))"},
        image:{type:"string"},
    },
    required:["fullName", "phone", "birthDate", "location", "email", "userName"],
    additionalProperties:false
}
const PlayerValidate = ajv.compile(PlayerSchema);

module.exports = PlayerValidate;

