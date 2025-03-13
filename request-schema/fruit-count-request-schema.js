/**
 * 
 * @description This object defines the request schema of calculate price api.
 */
module.exports = {
    type: "object",
    properties: {
      fruits: {type: "array"},
    },
    required: ["fruits"],
    additionalProperties: false,
}