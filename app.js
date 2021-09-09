const express = require("express");
const bodyParser = require("body-parser")
// create app
const app = express();
const db = require("../backend/app/models/index");
const Role = db.role;
const cors = require("cors");


// Синхронизация с бд
db.sequelize.sync({force: true}).then(result => {
    console.log(result.models);
    initial();
})
    .catch(err => {
        console.log(err);
    });

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// обработка запросов
require("./app/routes/transport.route")(app);
require("./app/routes/order.route")(app);
require("./app/routes/auth.route")(app);

const PORT = 8080;
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "admin"
    });

    Role.create({
        id: 3,
        name: "specialist"
    });
}