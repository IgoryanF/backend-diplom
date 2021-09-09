const { authJwt } = require("../middleware")

module.exports = app => {

    const orders = require("../controllers/Order.controller");

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    });

    const orderRouter = require("express").Router();

    orderRouter.post("/", orders.createOrder);

    orderRouter.get("/",
        [authJwt.verifyToken, authJwt.isAdminOrSpecialist], orders.getAllOrders);

    app.use("/api/order", orderRouter);
}