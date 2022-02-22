const { systemConfig } = require('../configs')

const reemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateEmail = function (email) {
    return reemail.test(email)
};

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const passwordLength = function (password) {
    if (password.length >= 8 && password.length <= 15) return true
    return false;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidString = function (value) {
    return Object.prototype.toString.call(value) === "[object String]"
}

const isValidNumber = function (value) {
    return Object.prototype.toString.call(value) === "[object Number]"
}

const isValidBag = function (size, weight, flap_color, inventory_id, state) {
    if(Object.prototype.toString.call(size) === "[object Number]")return false;
    if(Object.prototype.toString.call(weight) === "[object Number]")return false;
    if(Object.prototype.toString.call(flap_color) === "[object Number]")return false;
    if(Object.prototype.toString.call(state) === "[object Number]")return false;
    return true
}


module.exports = {
    validateEmail, isValid, isValidBag,
    isValidRequestBody, isValidObjectId, isValidString,
    passwordLength, isValidNumber,
};