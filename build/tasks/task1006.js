import { PageBuilder } from '../pageBuilder.js';
import { Colors } from '../utils/colors.js';
import { getDemandCurve } from '../utils/getDemandCurve.js';
import { getRandom } from '../utils/getRandom.js';
export class Task1006 {
    constructor() {
        this.taskNumber = 1006;
        this.pageBuilder = PageBuilder.getPageBuilder();
        this.getMarginalRevenueCurve = () => {
            const marginalRevenueC = getRandom(5, 40);
            const marginalRevenueK = getRandom(-10, -1);
            return [marginalRevenueC, marginalRevenueK];
        };
        this.getAverageCostsCurve = () => {
            const averageCostsK = getRandom(1, 8);
            return [averageCostsK];
        };
        this.getMarginalCostsCurve = () => {
            const marginalCostsK = getRandom(1, 10);
            return [marginalCostsK];
        };
        //a
        let optimalQ;
        const [averageCostsK] = this.getAverageCostsCurve();
        let demandC, demandK;
        do {
            [demandC, demandK] = getDemandCurve();
            optimalQ = demandC / -(demandK - averageCostsK);
        } while (optimalQ % 1 != 0);
        const demandString = `P = ${demandC} - ${-demandK}Q`;
        const averageCostsString = `AC = ${averageCostsK}Q`;
        //b
        let maxIncomeQ;
        const [marginalCostsK] = this.getMarginalCostsCurve();
        let marginalRevenueC, marginalRevenueK;
        do {
            [marginalRevenueC, marginalRevenueK] = this.getMarginalRevenueCurve();
            maxIncomeQ = marginalRevenueC / (marginalCostsK - marginalRevenueK);
        } while (maxIncomeQ % 1 != 0 || maxIncomeQ > optimalQ);
        const marginalRevenueString = `MR = ${marginalRevenueC} - ${-marginalRevenueK}Q`;
        const marginalCostsString = `MC=${marginalCostsK}Q`;
        const task = `Poptávka po produkci středně velké firmy lze vyjádřit funkcí: ${demandString}, mezní příjmy jsou ${marginalRevenueString}, průměrné náklady vyjadřuje funkce ${averageCostsString} mezní náklady ${marginalCostsString}`;
        const optimalP = demandC + demandK * optimalQ;
        const maxIncomeP = demandC + demandK * maxIncomeQ;
        this.taskString = task;
        this.answerHTML = this.createAnswerDiv();
        this.answers = [optimalQ, optimalP, maxIncomeQ, maxIncomeP];
    }
    createAnswerDiv() {
        const answerDiv = this.pageBuilder.createElement('div', {
            attributes: [{ attribute: "class", value: "answer-field" }]
        });
        const inputAQ = document.createElement('input');
        inputAQ.setAttribute("type", "text");
        inputAQ.setAttribute("id", `task-${this.taskNumber}-answer-aQ`);
        const inputAP = document.createElement('input');
        inputAP.setAttribute("type", "text");
        inputAP.setAttribute("id", `task-${this.taskNumber}-answer-aP`);
        const inputBQ = document.createElement('input');
        inputBQ.setAttribute("type", "text");
        inputBQ.setAttribute("id", `task-${this.taskNumber}-answer-bQ`);
        const inputBP = document.createElement('input');
        inputBP.setAttribute("type", "text");
        inputBP.setAttribute("id", `task-${this.taskNumber}-answer-bP`);
        answerDiv.innerHTML = `
			a) Určete objem produkce a tržní cenu, při kterých bude firma realizovat pouze nirmální zisk.
			<br>Q = ${inputAQ.outerHTML}. P = ${inputAP.outerHTML} 
			<br>b) Určete objem produkce a tržní cenu v situaci maximalizace zisku 
			<br>Q = ${inputBQ.outerHTML}. P = ${inputBP.outerHTML}<br>
		`;
        const answerButton = document.createElement('button');
        answerButton.setAttribute('id', `task-${this.taskNumber}-answer`);
        answerButton.innerText = "Check";
        answerButton.addEventListener('click', () => {
            this.check();
        });
        answerDiv.appendChild(answerButton);
        return answerDiv;
    }
    check() {
        const inputAQ = document.getElementById(`task-${this.taskNumber}-answer-aQ`);
        const inputAP = document.getElementById(`task-${this.taskNumber}-answer-aP`);
        const inputBQ = document.getElementById(`task-${this.taskNumber}-answer-bQ`);
        const inputBP = document.getElementById(`task-${this.taskNumber}-answer-bP`);
        const [answerAQ, answerAP, answerBQ, answerBP] = this.answers;
        inputAQ.style.background = parseInt(inputAQ.value) == answerAQ ? Colors.green : Colors.red;
        inputAP.style.background = parseInt(inputAP.value) == answerAP ? Colors.green : Colors.red;
        inputBQ.style.background = parseInt(inputBQ.value) == answerBQ ? Colors.green : Colors.red;
        inputBP.style.background = parseInt(inputBP.value) == answerBP ? Colors.green : Colors.red;
    }
    getTaskNumber() { return this.taskNumber; }
    getTaskString() { return this.taskString; }
    getTaskAnswer() { return this.answerHTML; }
}
