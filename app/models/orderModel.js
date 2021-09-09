module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        dateStart: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        dateFinish: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        typeLeasing: {
            type: Sequelize.ENUM,
            values: ['optimal', 'finance'],
            defaultValue: 'finance'
        }
    })

    return Order;
}