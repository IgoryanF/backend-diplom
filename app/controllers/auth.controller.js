const db = require("../models");
const config = require("../config/passport");
const User = db.Users;
const Role = db.role;
const RefreshToken = db.refresToken;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt =require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        login: req.body.login,
        email: req.body.email,
        name: req.body.name,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({
                        message: "User was registered successfully"
                    });
                });
            });
        } else {
            user.setRoles([1]).then(() => {
                res.send({
                    message: "User was registered successfully"
                });
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.login = (req, res) => {
    User.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User Not found"
                });
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password"
                });
            }

            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: config.jwtExpiration
            });

            let refreshToken = await RefreshToken.createToken(user);

            let authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    login: user.login,
                    email: user.email,
                    roles: authorities,
                    accessToken: token,
                    refreshToken: refreshToken
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
        return res.status(403).json({
            message: "Refresh Token is required!"
        });
    }

    try {
        let refreshToken = await RefreshToken.findOne({
            where: {
                token: requestToken
            }
        });

        console.log(refreshToken);

        if (!requestToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }

        if (RefreshToken.verifyExpiration(requestToken)) {
            RefreshToken.destroy({
                where: { id: refreshToken.id }
            });

            res.status(403).json({
                message: "Refresh token was expired. Please make a new login request",
            });
            return;
        }

        const user = await refreshToken.getUser();
        let newAccessToken = jwt.sign( { id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}