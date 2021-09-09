module.exports = app => {
    const transports = require("../controllers/Transport.controller");
    const transportRouter = require("express").Router();

    transportRouter.post('/', transports.createTransport);

    transportRouter.get('/', transports.getAllTransports);

    transportRouter.get('/getAllCars', transports.getAllCars);

    transportRouter.get('/getAllTrucks', transports.getAllTrucks);

    transportRouter.get('/getAllMoto', transports.getAllMoto);

    app.use('/api/transports', transportRouter);
}