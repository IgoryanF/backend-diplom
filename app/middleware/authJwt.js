const jwt = require("jsonwebtoken");
const config = require("../config/passport");
const db = require("../models");
const User = db.Users;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({
            message: "Unauthorized! Access Token was expired!"
        });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (!user) {
            res.status(404).send({
                message: "User Not found" });
            return;
        }
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
        });
    });
};

isSpecialist = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (!user) {
            res.status(404).send({
                message: "User Not found" });
            return;
        }
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "specialist") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Specialist Role!"
            });
        });
    });
}

isAdminOrSpecialist = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (!user) {
            res.status(404).send({
                message: "User Not found" });
            return;
        }
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "specialist") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Specialist or Admin Role!"
            });
        });
    });
};


const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isSpecialist: isSpecialist,
    isAdminOrSpecialist: isAdminOrSpecialist
}

module.exports = authJwt

