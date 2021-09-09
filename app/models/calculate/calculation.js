module.exports = class Calculation {
    constructor(cost, firstInstallmentPercent, financingTerm) {
        this.cost = cost;
        this.firstInstallmentPercent = firstInstallmentPercent;
        this.financingTerm = financingTerm;
    }

    getMonthlyPayment() {
        return this.cost / this.financingTerm;
    }
}

