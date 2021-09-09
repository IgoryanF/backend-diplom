module.exports = (sequelize, Sequelize) => {
    const Transport = sequelize.define("transport", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        brand: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mileage: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        fuelType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        class: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cost: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        yearOfIssue: {
            type: Sequelize.DATE,
            allowNull: false
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        automatic: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

    });

    return Transport;
}