const db = require("../models");
const TransportController = db.Transports;
const Op = require("sequelize");

exports.createTransport = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not by empty"
        });
    }

    const transport = {
        id: req.body.id,
        mileage: req.body.mileage,
        brand: req.body.brand,
        fuelType: req.body.fuelType,
        class: req.body.class,
        automatic: req.body.automatic,
        cost: req.body.cost,
        yearOfIssue: req.body.yearOfIssue,
        photo: req.body.photo,
        state: req.body.state
    }

    TransportController.create(transport)
        .then((data) => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the TransportController."
            })
        })
};

exports.getAllTransports = (req, res) => {
    TransportController.findAll().then((data) => {
        res.send(data);
    })
        .catch(err => {
            console.log(err.message)
        })
}

const getClassTransport = (type, res) => {
    TransportController.findAll({
        where: {
            class: type
        }
    }).then(data => {
        res.send(data)
    })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

exports.getAllCars = (req, res) => {
    getClassTransport("car", res);
};

exports.getAllTrucks = (req, res) => {
    getClassTransport("truck", res);
}

exports.getAllMoto = (req, res) => {
    getClassTransport("moto", res);
}