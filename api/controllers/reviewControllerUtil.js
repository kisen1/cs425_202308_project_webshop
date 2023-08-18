const {_save} = require('./controllerUtil');

const _checkReview = function (product, reviewId) {
    return new Promise((resolve, reject)=>{
        const review = product.reviews.id(reviewId);
        if(review) {
            resolve({product, review});
        }
        else {
            reject({code:404});
        }
    });
}

const _getPaginatedReviews = function (count, offset, product) {
    return new Promise((resolve)=>{
        const reviews = product.reviews.slice(offset, offset + count);
        resolve(reviews);
    });
}

const _createReview = function (req) {
    const newReview = {
        title: req.body.title, 
        rating: req.body.rating, 
        description: req.body.description
    };
    return(newReview);
}

const _pushReview= function (req, product) {
    return new Promise((resolve)=>{
        const newReview = _createReview(req);
        product.reviews.push(newReview);
        resolve(product);
    });
}

const _removeReview = function (productAndReviewObj) {
    return new Promise((resolve)=>{
        const {product, review} = productAndReviewObj;
        product.reviews.pull(review._id);
        resolve(productAndReviewObj);
    });
}

const _saveThenReturnReview = function (productAndReviewObj) {
    return new Promise((resolve, reject)=>{
        const {product, review} = productAndReviewObj;
        _save(product)
            .then(()=> resolve(review))
            .catch((error)=> reject(error));
    });
}

module.exports = {
    _saveThenReturnReview,
    _removeReview,
    _checkReview,
    _getPaginatedReviews,
    _pushReview,
}