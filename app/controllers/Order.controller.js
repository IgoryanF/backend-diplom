const db = require("../models");
const OrderController = db.Orders;
const Op = require("sequelize");
const CalculationFactory = require("../models/calculate/calculationFactory");

const factory = new CalculationFactory();

exports.createOrder = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not by empty"
        });
    }

    const order = {
        dateStart: req.body.dateStart,
        dateFinish: req.body.dateFinish,
        status: req.body.status,
        transportId: req.body.transportId
    };

    OrderController.create(order).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

exports.getAllOrders = (req, res, next) => {
    OrderController.findAll({include: ["transport"]}).then(data => {
        res.send(data);
    }).catch(err => {
        res.send({
            message: err.message
        });
    });
}
