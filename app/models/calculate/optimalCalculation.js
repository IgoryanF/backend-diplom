const Calculation = require("./calculation");

module.exports = class OptimalCalculation extends Calculation{
    constructor(cost, firstInstallmentPercent, financingTerm) {
        super(cost, firstInstallmentPercent, financingTerm);
        this.leasingType = 'optimal';
    }

    getMonthlyPayment() {
        return (this.cost - this.cost * this.firstInstallmentPercent) / this.financingTerm + 10;
    }
}