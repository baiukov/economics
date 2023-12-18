import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getTotalProductCurve } from '../utils/getTotalProductCurve.js'

export class Task419 implements ITask {
	private taskNumber = 419;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<number | string>
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {
		//a
		let productionK1: number, productionK2: number
		let marginalProductC: number, marginalProductK: number
		let quantity: number
		let price: number
		let qMaxUtility: number
		do {
			[productionK1, productionK2] = getTotalProductCurve();
			//a 
			[marginalProductC, marginalProductK] = [productionK1, productionK2 * 2] // MU = 0 => c - k*X = 0 => X = c / -k
			quantity = (marginalProductC / -marginalProductK)
			// (c - k*Q) / p = 1 => p = c - k*Q = > Q = p-c / -k
			price = this.getProductPrice()
			qMaxUtility = (price - marginalProductC) / -marginalProductK
		} while (quantity % 1 != 0 || qMaxUtility % 1 != 0 || qMaxUtility <= 0)

		const taskFunctionString = getRandom(0, 99) < 80 ? `Máme dánou funkci celkové užitečnosti ve tvaru TU=${productionK1}X - ${-productionK2}X<sup>2</sup>` :
			`Máme dánou funkci mezní užitečnosti ve tvaru MU=${marginalProductC} - ${-marginalProductK}X.`
		const task = taskFunctionString + `Písmeno X označuje spotřebovávané množství zboží X za týden.`

		this.taskString = task
		this.answerHTML = this.createAnswerDiv(price) as HTMLDivElement
		this.answers = [quantity, qMaxUtility]
	}

	public createAnswerDiv(price: number) {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputAQ = document.createElement('input')
		inputAQ.setAttribute("type", "text")
		inputAQ.setAttribute("id", `task-${this.taskNumber}-answer-aQ`)
		const inputCQ = document.createElement('input')
		inputCQ.setAttribute("type", "text")
		inputCQ.setAttribute("id", `task-${this.taskNumber}-answer-cQ`)
		answerDiv.innerHTML = `
			a) Při jaké úrovni spotřeby začne TU klesat
			<br>Q = ${inputAQ.outerHTML}
			<br>c) Cena X je ${price}. Při jaké spotřebě X bude domácnost maximalizovat užitek (víte, že poměr MU/p pro všechno ostatní kupované zboží je roven jedné)
			<br>${inputCQ.outerHTML}<br>
		`

		const answerButton = document.createElement('button')
		answerButton.setAttribute('id', `task-${this.taskNumber}-answer`)
		answerButton.innerText = "Check"
		answerButton.addEventListener('click', () => {
			this.check()
		})
		answerDiv.appendChild(answerButton)
		return answerDiv
	}

	private check() {
		const inputAQ = document.getElementById(`task-${this.taskNumber}-answer-aQ`) as HTMLInputElement
		const inputCQ = document.getElementById(`task-${this.taskNumber}-answer-cQ`) as HTMLInputElement
		const [answerAQ, answerCQ] = this.answers
		inputAQ.style.background = parseInt(inputAQ.value) == answerAQ ? Colors.green : Colors.red
		inputCQ.style.background = inputCQ.value == answerCQ ? Colors.green : Colors.red
	}

	private getProductPrice = () => {
		const productPrice = getRandom(1, 50)
		return productPrice
	}


	public getTaskNumber() { return this.taskNumber }

	public getTaskString() { return this.taskString }

	public getTaskAnswer() { return this.answerHTML }

}