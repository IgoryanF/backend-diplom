module.exports = (sequelize, Sequelize) => {
    const Calculation = sequelize.define("calculation", {
        cost: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        firstInstallment: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        financingTerm: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        monthlyPayment: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        typeLeasing: {
            type: Sequelize.ENUM,
            values: ['optimal', 'finance'],
            defaultValue: 'finance'
        }
    });
    return Calculation;
}