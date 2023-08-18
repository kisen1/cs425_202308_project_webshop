const util = require("util");
const jwt = require("jsonwebtoken");
const { _setOKResponse, _setAppropriateErrorResponse, _sendResponse } = require("./controllerUtil");

const promisifiedJwtVerfiy = util.promisify(jwt.verify);

module.exports.authenticate = function(req, res, next){
    const response = {
        code: 401,
        msg: {error: "Access Denied, Unauthorized"}
    }
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        promisifiedJwtVerfiy(token, "CS572")
            .then(() => next())
            .catch((error) => res.status(response.code).json(error))
    }else{
        res.status(response.code).json(response.msg);
    }
    
}