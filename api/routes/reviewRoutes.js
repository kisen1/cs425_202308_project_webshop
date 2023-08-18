const router = require("express").Router({mergeParams: true});
const reviewsController = require("../controllers/reviewsController");
const authenticationController = require('../controllers/authenticationController');

router.route("/")
    .get(reviewsController.getAll)
    .post(authenticationController.authenticate, reviewsController.addOne);

router.route("/:reviewId")
    .patch(authenticationController.authenticate, reviewsController.partialUpdateOne)
    .put(authenticationController.authenticate, reviewsController.fullUpdateOne)
    .delete(authenticationController.authenticate, reviewsController.deleteOne)
    .get(reviewsController.getOne);

module.exports = router