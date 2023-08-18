const productsController = require("../controllers/productsController");
const router = require("express").Router();
const authenticationController = require("../controllers/authenticationController");

router.route("/")
    .get( productsController.getAll)
    .post(authenticationController.authenticate, productsController.addOne);

router.route("/:productId")
    .get(productsController.getOne)
    .delete(authenticationController.authenticate, productsController.deleteOne)
    .patch(productsController.partialUpdateOne)
    .put(authenticationController.authenticate, productsController.fullUpdateOne);


module.exports = router;


