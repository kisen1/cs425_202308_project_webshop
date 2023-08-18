const express = require("express");
const router = express.Router();

const productRouter = require("./productRoutes");
const reviewRouter = require("./reviewRoutes");
const userRouter = require("./userRoutes");

router.use("/products/:productId/reviews", reviewRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);


module.exports = router;