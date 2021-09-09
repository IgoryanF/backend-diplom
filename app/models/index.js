const dbConfig = require("../config/db");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(dbConfig.NAME, dbConfig.USER, dbConfig.PASSWORD, {
    port:dbConfig.PORT,
    dialect: dbConfig.dialect,
    host: dbConfig.HOST,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("../models/userModel")(sequelize, Sequelize);
db.Transports = require("../models/transportModel")(sequelize, Sequelize);
db.Orders = require("../models/orderModel")(sequelize, Sequelize);
db.Calculations = require("../models/calculationModel")(sequelize, Sequelize);
db.role = require("../models/roleModel")(sequelize, Sequelize);
db.refresToken = require("./refreshTokenModel")(sequelize, Sequelize);

db.Users.hasMany(db.Orders, { as: "orders" });
db.Orders.belongsTo(db.Users, {
    foreignKey: "userId",
    as: "user"
});

db.Transports.hasMany(db.Orders, { as: "orders" });
db.Orders.belongsTo(db.Transports, {
    foreignKey: "transportId",
    as: "transport"
});

db.Calculations.hasOne(db.Orders, {
    foreignKey: "calculationId"
});
db.Orders.belongsTo(db.Calculations, {
    foreignKey: "calculationId"
});

// Role
db.role.belongsToMany(db.Users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.Users.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

// refreshToken
db.refresToken.belongsTo(db.Users, {
    foreignKey: 'userId', targetKey: 'id'
});
db.Users.hasOne(db.refresToken, {
    foreignKey: 'userId', targetKey: 'id'
})

db.ROLES = ["user", "admin", "specialist"];

module.exports = db;