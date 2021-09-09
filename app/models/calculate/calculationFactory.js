const FinanceCalculation = require("./financeCalculation");
const OptimalCalculation = require("./optimalCalculation");

module.exports = class CalculationFactory {
    static list = {
        finance: FinanceCalculation,
        optimal: OptimalCalculation
    }

    createCalculation(cost, firstInstallmentPercent, financingTerm,  leasingType = 'finance') {
        const Calc = CalculationFactory.list[leasingType] || CalculationFactory.list.finance;
        const calc = new Calc(cost, firstInstallmentPercent, financingTerm);
        calc.getCalculation = function () {
            return {
                cost: this.cost,
                firstInstallment: this.firstInstallmentPercent * this.cost,
                financingTerm: this.financingTerm,
                monthPayment: this.getMonthlyPayment()
            }
        }
        return calc;
    }
}