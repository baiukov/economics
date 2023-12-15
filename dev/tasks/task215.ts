import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'

export class Task215 implements ITask {
	private taskNumber = 215;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<number | string>
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {

		let demandC, demandK, supplyC, supplyK, quantity, price, govPrice, newDemandQ, newSupplyQ, expenses
		do {
			demandC = getRandom(100, 10)
			demandK = getRandom(15, -15)
			supplyC = getRandom(100, 10)
			supplyK = getRandom(15, -15)

			quantity = (demandC - supplyC) / (supplyK - demandK)
			price = demandC + demandK * quantity
			govPrice = getRandom(Math.round(price * 1.5), price + 1)
			newDemandQ = (govPrice - demandC) / demandK
			newSupplyQ = (govPrice - supplyC) / supplyK
			expenses = (newSupplyQ - newDemandQ) * govPrice
		} while (quantity % 1 != 0 || quantity <= 0 || price <= 0 || govPrice <= 0 || expenses % 1 != 0 || expenses <= 0 || newDemandQ % 1 != 0 || newSupplyQ % 1 != 0 || newDemandQ <= 0 || newSupplyQ <= 0)

		const isDkNegative = demandK < 0
		const isSkNegative = supplyK < 0
		this.taskString = `
			Poptávku po obilí je lze zapsat rovnicí: P = ${demandC} ${isDkNegative ? ("- " + -demandK) : ("+ " + demandK)}Q, nabídku rovnicí: P = ${supplyC} ${isSkNegative ? ("- " + -supplyK) : ("+ " + supplyK)}Q. Vláda stanovila nákupní cenu ${govPrice} EUR za metrický cent a zavázala se vykupovat veškere přebytky obilí vzniklé při této ceně. Jaké náklady budou spojeny s odkupem obilí?
		`
		this.answerHTML = this.createAnswerDiv(price) as HTMLDivElement
		this.answers = [expenses]
	}

	public createAnswerDiv(price: number) {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const input = document.createElement('input')
		input.setAttribute("type", "text")
		input.setAttribute("id", `task-${this.taskNumber}-answer-input`)
		answerDiv.innerHTML = `${input.outerHTML}`

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
		const input = document.getElementById(`task-${this.taskNumber}-answer-input`) as HTMLInputElement
		const [expenses] = this.answers
		input.style.background = parseInt(input.value) === expenses ? Colors.green : Colors.red
	}

	public getTaskAnswer() { return this.answerHTML }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }
}