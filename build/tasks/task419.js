import { PageBuilder } from '../pageBuilder.js';
import { Colors } from '../utils/colors.js';
import { getRandom } from '../utils/getRandom.js';
import { getTotalProductCurve } from '../utils/getTotalProductCurve.js';
export class Task419 {
    constructor() {
        this.taskNumber = 419;
        this.pageBuilder = PageBuilder.getPageBuilder();
        this.getCapitalPrice = () => {
            const price = getRandom(50, 300);
            return price;
        };
        this.getProductPrice = () => {
            const productPrice = getRandom(1, 50);
            return productPrice;
        };
        this.getCapital = () => {
            const capital = getRandom(1, 10);
            return capital;
        };
        //a
        let productionK1, productionK2;
        let marginalProductC, marginalProductK;
        let quantity;
        let price;
        let qMaxUtility;
        do {
            [productionK1, productionK2] = getTotalProductCurve();
            //a 
            [marginalProductC, marginalProductK] = [productionK1, productionK2 * 2]; // MU = 0 => c - k*X = 0 => X = c / -k
            quantity = (marginalProductC / -marginalProductK);
            // (c - k*Q) / p = 1 => p = c - k*Q = > Q = p-c / -k
            price = this.getProductPrice();
            qMaxUtility = (price - marginalProductC) / -marginalProductK;
        } while (quantity % 1 != 0 || qMaxUtility % 1 != 0 || qMaxUtility <= 0);
        console.log(`TU = ${productionK1}X - ${-productionK2}X**2`, quantity, qMaxUtility);
        const taskFunctionString = getRandom(0, 99) < 80 ? `Máme dánou funkci celkové užitečnosti ve tvaru TU=${productionK1}X - ${-productionK2}X<sup>2</sup>` :
            `Máme dánou funkci mezní užitečnosti ve tvaru MU=${marginalProductC} - ${-marginalProductK}X.`;
        const task = taskFunctionString + `Písmeno X označuje spotřebovávané množství zboží X za týden.`;
        this.taskString = task;
        this.answerHTML = this.createAnswerDiv(price);
        this.answers = [quantity, qMaxUtility];
    }
    createAnswerDiv(price) {
        const answerDiv = this.pageBuilder.createElement('div', {
            attributes: [{ attribute: "class", value: "answer-field" }]
        });
        const inputAQ = document.createElement('input');
        inputAQ.setAttribute("type", "text");
        inputAQ.setAttribute("id", `task-${this.taskNumber}-answer-aQ`);
        const inputCQ = document.createElement('input');
        inputCQ.setAttribute("type", "text");
        inputCQ.setAttribute("id", `task-${this.taskNumber}-answer-cQ`);
        answerDiv.innerHTML = `
			a) Při jaké úrovni spotřeby začne TU klesat
			<br>Q = ${inputAQ.outerHTML}
			<br>c) Cena X je ${price}. Při jaké spotřebě X bude domácnost maximalizovat užitek (víte, že poměr MU/p pro všechno ostatní kupované zboží je roven jedné)
			<br>${inputCQ.outerHTML}<br>
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
        const inputCQ = document.getElementById(`task-${this.taskNumber}-answer-cQ`);
        const [answerAQ, answerCQ] = this.answers;
        inputAQ.style.background = parseInt(inputAQ.value) == answerAQ ? Colors.green : Colors.red;
        inputCQ.style.background = inputCQ.value == answerCQ ? Colors.green : Colors.red;
        console.log(answerAQ, answerCQ);
    }
    getTaskNumber() { return this.taskNumber; }
    getTaskString() { return this.taskString; }
    getTaskAnswer() { return this.answerHTML; }
}
