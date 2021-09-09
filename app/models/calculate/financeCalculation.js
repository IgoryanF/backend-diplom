const Calculation = require("./calculation");

module.exports = class FinanceCalculation extends Calculation {
    constructor(cost, firstInstallmentPercent, financingTerm) {
        super(cost, firstInstallmentPercent, financingTerm);
        this.leasingType = 'finance';
    }

    getMonthlyPayment() {
        return (this.cost - this.cost * this.firstInstallmentPercent) / this.financingTerm;
    }
}