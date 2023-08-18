const router = require('express').Router();
const userController = require("../controllers/usersController");
const authenticationController = require('../controllers/authenticationController');

router.route("/")
    .post(userController.register);

router.route("/login")
    .post(userController.login);

router.route('/update/:userId')
    .patch(authenticationController.authenticate, userController.updateProfile);

router.route("/:name")
    .get(authenticationController.authenticate, userController.getProfile)


module.exports = router;