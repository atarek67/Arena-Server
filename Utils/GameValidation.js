const Ajv = require("ajv");
var ajv = new Ajv();
const GameSchema = {
    type:"object",
    properties:{
        userId:{type:"string"},
        userFullName:{type:"string",pattern:"^[a-zA-Z\\s]+$"},
        fieldId:{type:"string"},
        fieldName:{type:"string"},
        date:{type:"string",pattern:"(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[469]|11)[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[13578]|1[02])[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))" },
        hour:{type:"integer",maximum:23,minimum:0 },
        price:{type:"string"},
        rate:{type:"string",pattern:"^[1-5]*$" },
        comment:{type:"string",pattern:"^[A-Za-z0-9\\s]*$" },
        complain:{type:"string",pattern:"^[A-Za-z0-9\\s]*$" }
    },
    required:["userId","userFullName","fieldId","fieldName","date","hour","price"],
    additionalProperties:false
}
const GameValidate = ajv.compile(GameSchema);

module.exports = GameValidate;

