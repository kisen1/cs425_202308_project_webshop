const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const { _intializeResponse, _setOKResponse, _setAppropriateErrorResponse, _sendResponse, _checkExistance, _setMissingFieldsErrorResponse, _save } = 
require('./controllerUtil');
const User = mongoose.model(process.env.USERS_MODEL);


const _hashPassword = function(password, salt){
    return bcrypt.hash(password, salt);
}

const _createUser = function(name, userName, passwordHash){
    return new Promise((resolve)=>{
        const newUser = {
            name,
            userName,
            password: passwordHash
        }
        resolve(newUser);
    });
}

const _checkPassword = function(password, user){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, user.password)
        .then((doesMatch) =>{
            if(doesMatch) resolve(user);
            else reject({code:403})
        })
        .catch((error)=> reject(error));
    });
}

const _sign = util.promisify(jwt.sign);

const _generateToken = function(user){
    return _sign({user:user.name}, 'CS572', {expiresIn:3600});
}

const _formatToken = function(generatedToken){
    return new Promise((resolve)=> resolve({token: generatedToken}))
}

const addOne = function (req, res) {
    const response = _intializeResponse();
    if(req.body.userName && req.body.password){
        const password = req.body.password.toString();
        const userName = req.body.userName.toLowerCase();
        const name = req.body.name;
        bcrypt.genSalt(parseInt(process.env.SALT_ROUND))
            .then((salt) => _hashPassword(password, salt))
            .then((passwordHash) => _createUser(name, userName, passwordHash))
            .then((createdUser)=> User.create(createdUser))
            .then((createdUser) => _setOKResponse(response, createdUser))
            .catch((error)=> _setAppropriateErrorResponse(response, error))
            .finally(()=> _sendResponse(res, response));
    }else{
        _setMissingFieldsErrorResponse(response);
        _sendResponse(res, response);
    }
}

const _updateOne = function (req, res, makeUpdate) {
    const response = _intializeResponse()
    const userId = req.params.userId;
    User.findById(userId)
        .then((user) => _checkExistance(user))
        .then((user) => makeUpdate(user))
        .then((user) => _save(user))
        .then((updatedUser) => _setOKResponse(response, updatedUser))
        .catch((error) => _setAppropriateErrorResponse(response, error))
        .finally(() => _sendResponse(res, response));
}

const partialUpdateOne = function (req, res) {
    const makePartialUpdate = function (user) {
        return new Promise((resolve) => {
            if (req.body.name) user.name = req.body.name;
            if (req.body.userName) user.userName = req.body.userName;
            resolve(user);
        });
    }
    _updateOne(req, res, makePartialUpdate);
}

const getProfile = function(req, res){
    const response = _intializeResponse();
    if(req.params.name){
        const name = req.params.name;
        User.findOne({name: name})
            .then((user) => _checkExistance(user))
            .then((user) => _setOKResponse(response, user))
            .catch((error) => _setAppropriateErrorResponse(response, error))
            .finally(() => _sendResponse(res, response));
    }else{
        _setMissingFieldsErrorResponse(response);
        _sendResponse(res, response);
    }
}

const getOne = function (req, res) {
    const response = _intializeResponse();
    if(req.body.userName && req.body.password){
        const password = req.body.password.toString();
        const userName = req.body.userName.toString().toLowerCase();
        User.findOne({userName: userName})
        .then((user) => _checkExistance(user))
        .then((user)=> _checkPassword(password, user))
        .then((user)=> _generateToken(user))
        .then((generatedToken) => _formatToken(generatedToken))
        .then((formatedToken)=> _setOKResponse(response, formatedToken))
        .catch((error)=> _setAppropriateErrorResponse(response, error))
        .finally(()=> _sendResponse(res, response));
    }else{
        _setMissingFieldsErrorResponse(response);
        _sendResponse(res, response);
    }
}

module.exports = {
    register: addOne, 
    login: getOne, 
    getProfile,
    updateProfile: partialUpdateOne
}