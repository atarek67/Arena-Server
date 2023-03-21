const Ajv = require("ajv");
var ajv = new Ajv();
const FieldSchema = {
    type: "object",
    properties: {
        fieldName: { type: "string" },
        location: { type: "string" },
        locationOnMap: { type: "string" },
        price: { type: "string", pattern: "^[0-9]+$", maxLength: 4, minLength: 3 },
        rate: { type: "string", pattern: "^[0-5]+$", maxLength: 1 },
        fieldOwnerId: { type: "string" },
        fieldOwnerFullName: { type: "string"},
        valid: { type: "string", pattern: "^[0-1]+$" },
        createdDate: { type: "string", pattern: "(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[469]|11)[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[13578]|1[02])[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))" },
        images: { type: "array", items: { type: "string" } }
    },
    required: ["fieldName", "location", "locationOnMap", "price", "fieldOwnerId", "fieldOwnerFullName"],
    additionalProperties: true
}
const FieldValidate = ajv.compile(FieldSchema);

module.exports = FieldValidate;

