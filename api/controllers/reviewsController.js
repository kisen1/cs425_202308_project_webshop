const mongoose= require("mongoose");
const Product= mongoose.model(process.env.Product_MODEL);
const {
    _checkExistance,
    _save,
    _intializeResponse,
    _setAppropriateErrorResponse,
    _setOKResponse,
    _sendResponse
} = require("./controllerUtil");
const {
    _checkReview,
    _getPaginatedReviews,
    _pushReview,
    _removeReview,
    _saveThenReturnReview,
} = require("./reviewControllerUtil");

const _calculateRatingAverage = function (product) {
    return new Promise((resolve, reject)=>{
        const {reviews} = product;
        const sum = reviews.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const avg = 0;
        if(reviews.length > 0) avg = sum/reviews.length;
        resolve(avg);
    });
}

const getOne= function(req, res) {
    const productId= req.params.productId;
    const reviewId= req.params.reviewId;
    const response = _intializeResponse();

    Product.findById(productId)
        .then((product) => _checkExistance(product))
        .then((product)=> _checkReview(product, reviewId))
        .then((productAndReviewObj) => _setOKResponse(response, productAndReviewObj.review))
        .catch((error)=> _setAppropriateErrorResponse(response, error))
        .finally(()=>_sendResponse(res, response));
}

const getAll= function(req, res) {
    let offset = 0;
    let count = 3;
    if (req.query && req.query.offset) {
        offset= parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count= parseInt(req.query.count);
    }
    const productId= req.params.productId;
    const response = _intializeResponse();
    Product.findById(productId)
        .then((product)=>_checkExistance(product))
        .then((product) => _getPaginatedReviews(count, offset, product))
        .then((reviews)=> _setOKResponse(response, reviews))
        .catch((error) => _setAppropriateErrorResponse(error))
        .finally(()=>_sendResponse(res, response));
}

const addOne = function(req, res) {
    const productId= req.params.productId;
    const response = _intializeResponse()
    Product.findById(productId)
        .then((product) => _checkExistance(product))
        .then((product) => _pushReview(req, product))
        .then((product) => _save(product))
        .then((product) => _setOKResponse(response, product))
        .catch((error) => _setAppropriateErrorResponse(response, error))
        .finally(()=> _sendResponse(res, response));
}

const deleteOne = function (req, res) {
    const productId= req.params.productId;
    const reviewId= req.params.reviewId;
    const response = _intializeResponse();

    Product.findById(productId)
        .then((product) => _checkExistance(product))
        .then((product)=> _checkReview(product, reviewId))
        .then((productAndReviewObj) => _removeReview(productAndReviewObj))
        .then((productAndReviewObj)=> _saveThenReturnReview(productAndReviewObj))
        .then((review)=>_setOKResponse(response, review))
        .catch((error)=> _setAppropriateErrorResponse(error))
        .finally(()=> _sendResponse(res, response));
}

const _updateOne = function (req, res, makeUpdate) {
    const response = _intializeResponse()
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;
    Product.findById(productId)
        .then((product) => _checkExistance(product))
        .then((product)=>_checkReview(product, reviewId))
        .then((productAndReviewObj) => makeUpdate(productAndReviewObj))
        .then((productAndReviewObj)=> _saveThenReturnReview(productAndReviewObj))
        .then((review) => _setOKResponse(response, review))
        .catch((error) => _setAppropriateErrorResponse(response, error))
        .finally(() => _sendResponse(res, response));
}

const partialUpdateOne = function (req, res) {
    const makePartialUpdate = function (productAndReviewObj) {
        const {product, review} = productAndReviewObj;
        return new Promise((resolve) => {
            if (req.body.title) review.title = req.body.title;
            if (req.body.rating) review.rating = req.body.rating;
            if (req.body.description) review.description = req.body.description;
            resolve(productAndReviewObj);
        });
    }
    _updateOne(req, res, makePartialUpdate);
}

const fullUpdateOne = function (req, res) {
    const makeFullUpdate = function (productAndReviewObj) {
        return new Promise((resolve) => {
            const {review} = productAndReviewObj;
            review.title = req.body.title;
            review.rating = req.body.rating;
            review.description = req.body.description;
            resolve(productAndReviewObj);
        });
    }
    _updateOne(req, res, makeFullUpdate);
}

module.exports = exports = {
    addOne,
    getAll,
    getOne, 
    deleteOne, 
    fullUpdateOne, 
    partialUpdateOne
}