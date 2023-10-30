import { PageBuilder } from '../pageBuilder.js';
import { Colors } from '../utils/colors.js';
import { getRandom } from '../utils/getRandom.js';
export class Task718 {
    constructor() {
        this.taskNumber = 718;
        this.pageBuilder = PageBuilder.getPageBuilder();
        this.getTotalProductCurve = () => {
            const productionK1 = getRandom(11, 100);
            const productionK2 = getRandom(-0.1, -10);
            return [productionK1, productionK2];
        };
        this.getProductPrice = () => {
            const productPrice = getRandom(1, 20);
            return productPrice;
        };
        this.getLabourPrice = () => {
            const labourPrice = getRandom(21, 200);
            return labourPrice;
        };
        this.getFixedCosts = () => {
            const fixedCosts = getRandom(100, 7000);
            return fixedCosts;
        };
        //a
        let productPrice = this.getProductPrice();
        let productionK1, productionK2;
        let marginalProductC, marginalProductK;
        let labourPrice;
        let labour;
        let totalProduct;
        do {
            [productionK1, productionK2] = this.getTotalProductCurve();
            labourPrice = this.getLabourPrice();
            [marginalProductC, marginalProductK] = [productionK1, productionK2 * 2];
            let [mrpC, mrpK] = [productionK1 * productPrice, marginalProductK * productPrice];
            console.log(`MRP = ${mrpC} - ${-mrpK}L**2`);
            labour = (mrpC - labourPrice) / -mrpK;
            // labour = ((productionK1 * productPrice) - labourPrice) / (marginalProductK * productPrice)
            totalProduct = productionK1 * labour + (productionK2 * labour * labour);
        } while (labour % 1 != 0 || labour <= 0 || totalProduct <= 0);
        const totalProductString = `Q = ${productionK1}L - ${-productionK2}L<sup>2</sup>`;
        //b
        //c
        //d
        const fixedCosts = this.getFixedCosts();
        const totalRevenue = totalProduct * productPrice;
        const variableCosts = labourPrice * labour;
        const totalCosts = variableCosts + fixedCosts;
        const income = totalRevenue - totalCosts;
        console.log(labour, totalProduct, totalRevenue, income);
        const task = `Práce je jedním variabilním výrobním faktorem. Produkční funkce firmy má tvar ${totalProductString}, kde L je množství spotřebovávané práce v hodinách za den. Všechny trhy jsou dokonale konkurenční. Výrobky se prodávají za cenu ${productPrice} Kč/ks a hodinová mzdová sazba je ${labourPrice} Kč. Firma maximalizuje zisk.`;
        this.taskString = task;
        this.answerHTML = this.createAnswerDiv(fixedCosts);
        this.answers = [labour, totalProduct, totalRevenue, income];
    }
    createAnswerDiv(fixedCosts) {
        const answerDiv = this.pageBuilder.createElement('div', {
            attributes: [{ attribute: "class", value: "answer-field" }]
        });
        const inputAL = document.createElement('input');
        inputAL.setAttribute("type", "text");
        inputAL.setAttribute("id", `task-${this.taskNumber}-answer-aL`);
        const inputB = document.createElement('button');
        inputB.setAttribute("id", `task-${this.taskNumber}-answer-B`);
        inputB.innerHTML = "Show";
        const inputCTP = document.createElement('input');
        inputCTP.setAttribute("type", "text");
        inputCTP.setAttribute("id", `task-${this.taskNumber}-answer-cTP`);
        const inputCTR = document.createElement('input');
        inputCTR.setAttribute("type", "text");
        inputCTR.setAttribute("id", `task-${this.taskNumber}-answer-cTR`);
        const inputDZ = document.createElement('input');
        inputDZ.setAttribute("type", "text");
        inputDZ.setAttribute("id", `task-${this.taskNumber}-answer-dZ`);
        answerDiv.innerHTML = `
			a) Kolik hodin práce bude firma denně najímat?
			<br>L = ${inputAL.outerHTML}.
			<br>b) Graficky znázorněte vzniklou rovnováhu firmy ${inputB.outerHTML}.
			<br>c) Jaký objem produkce firma za den vyrobí a jaké budou její celkové příjmy 
			<br>Q = ${inputCTP.outerHTML}. TR = ${inputCTR.outerHTML}?
			<br>d) Jaký bude denní zisk firmy, jestliže její denní FC jsou ${fixedCosts} ,-Kč? <br>z = ${inputDZ.outerHTML}<br>
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
        const inputAL = document.getElementById(`task-${this.taskNumber}-answer-aL`);
        const inputCTP = document.getElementById(`task-${this.taskNumber}-answer-cTP`);
        const inputCTR = document.getElementById(`task-${this.taskNumber}-answer-cTR`);
        const inputDZ = document.getElementById(`task-${this.taskNumber}-answer-dZ`);
        const [answerAL, answerCTP, answerCTR, answerDZ] = this.answers;
        inputAL.style.background = parseInt(inputAL.value) == answerAL ? Colors.green : Colors.red;
        inputCTP.style.background = parseInt(inputCTP.value) == answerCTP ? Colors.green : Colors.red;
        inputCTR.style.background = parseInt(inputCTR.value) == answerCTR ? Colors.green : Colors.red;
        inputDZ.style.background = parseInt(inputDZ.value) == answerDZ ? Colors.green : Colors.red;
    }
    getTaskNumber() { return this.taskNumber; }
    getTaskString() { return this.taskString; }
    getTaskAnswer() { return this.answerHTML; }
}
