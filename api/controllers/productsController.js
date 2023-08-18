const mongoose = require("mongoose");
const Product = mongoose.model(process.env.Product_MODEL);
const {
        _intializeResponse, 
        _checkExistance,
        _save,
        _sendResponse,
        _setAppropriateErrorResponse,
        _setOKResponse,
    } = require("./controllerUtil");


const _updateOne = function (req, res, makeUpdate) {
    const response = _intializeResponse()
    const productId = req.params.productId;
    Product.findById(productId)
        .then((product) => _checkExistance(product))
        .then((product) => makeUpdate(product))
        .then((product) => _save(product))
        .then((updatedProduct) => _setOKResponse(response, updatedProduct))
        .catch((error) => _setAppropriateErrorResponse(response, error))
        .finally(() => _sendResponse(res, response));
}

const partialUpdateOne = function (req, res) {
    const makePartialUpdate = function (product) {
        return new Promise((resolve) => {
            if (req.body.name) product.name = req.body.name;
            if (req.body.price) product.price = req.body.price;
            if (req.body.img) product.img = req.body.img;
            resolve(product);
        });
    }
    _updateOne(req, res, makePartialUpdate);
}

const fullUpdateOne = function (req, res) {
    const makeFullUpdate = function (product) {
        return new Promise((resolve) => {
            product.name = req.body.name;
            product.price = req.body.price;
            product.img = req.body.img;
            resolve(product);
        });
    }
    _updateOne(req, res, makeFullUpdate);
}

const deleteOne = function (req, res) {
    const response = _intializeResponse();
    const productId = req.params.productId;
    Product.findByIdAndDelete(productId)
        .then((deletedProduct) => _checkExistance(deletedProduct))
        .then((deletedProduct) => _setOKResponse(response, deletedProduct))
        .catch((error) => _setAppropriateErrorResponse(response, error))
        .finally(() => _sendResponse(res, response));
}

const getOne = function (req, res) {
    const response = _intializeResponse();
    const productId = req.params.productId;
    Product.findById(productId)
        .then((product) => _checkExistance(product))
        .then((product) => _setOKResponse(response, product))
        .catch((error) => _setAppropriateErrorResponse(response, error))
        .finally(() => _sendResponse(res, response));
}

const getAll = function (req, res) {
    let offset = 0;
    let count = 5;
    const predicator = {};
    const response = _intializeResponse()
    if (req.query && req.query.offset) offset = parseInt(req.query.offset);
    if (req.query && req.query.count)  count = parseInt(req.query.count);
    if(req.query && req.query.productName && req.query.productName !== 'undefined') predicator.name = req.query.productName
    Product.find(predicator).skip(offset).limit(count)
        .then((prodcuts) => _setOKResponse(response, prodcuts))
        .catch((error) => _setAppropriateErrorResponse(response, error))
        .finally(()=>_sendResponse(res, response));
}

const addOne = function (req, res) {
    const response = _intializeResponse()
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
    };
    Product.create(newProduct)
        .then((storedProduct) => _setOKResponse(response, storedProduct))
        .catch((error) => _setAppropriateErrorResponse(response, error))
        .finally(()=>_sendResponse(res, response));
}

exports = module.exports = { 
    getAll, 
    addOne, 
    getOne, 
    deleteOne, 
    fullUpdateOne, 
    partialUpdateOne 
}