const constantsParam = require('../constants/static.js');
const Ajv = require("ajv");
const ajv = new Ajv();
const requestSchema = require('../request-schema/fruit-count-request-schema.js');
const shoppingService = require('../services/shopping.services.js');

exports.calculateTotalPrice = async (req, res, next) => {
    try {
        let responseResult = {};
        const validate = ajv.compile(requestSchema);
        const valid = validate(req.body);
        if (!valid) {
            console.log(validate.errors)
            responseResult.status = 'E';
            responseResult.statusDescription = "Request Validation error, " + validate.errors[0].message;
            responseResult.errorCode = '400';
            return res.status(constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        }
        if(req.body.fruits.length == 0) {
            responseResult.success = true;
            responseResult.totalPrice = `₹0`;
            responseResult.message = 'Cart is empty';
            res.status(constantsParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult);
        }
        let totalPrice = await shoppingService.calculateTotal(req.body.fruits);
        if (totalPrice.success) {
            responseResult.success = true;
            responseResult.totalPrice = `₹${totalPrice.totalCost}`;
            responseResult.message = 'Successfully calculated the price';
            res.status(constantsParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult);
        } else {
            responseResult.success = false;
            responseResult.message = 'Failed to calculate the price';
            res.status(constantsParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult);
        }
    } catch (error) {
        console.log('error ', error)
        next(error)
    }
}
