const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = app => {

    const authRouter = require("express").Router();

    app.use((req, res, next)=> {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    authRouter.post("/signup", [
        verifySignUp.checkDuplicateLoginOrEmail,
        verifySignUp.checkRoleExisted
    ],
      controller.signup);

    authRouter.post("/login", controller.login);

    authRouter.post("/refreshToken", controller.refreshToken);

    app.use("/api/auth", authRouter)
}