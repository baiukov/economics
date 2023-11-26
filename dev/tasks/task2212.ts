import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloatFixed1 } from '../utils/getRandomFloatFixed1.js'

export class Task2212 implements ITask {
	private taskNumber = 2212;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined
	private pageBuilder = PageBuilder.getPageBuilder()
	private answers: number[]

	public constructor() {
		let taxRate
		let marginalC
		let oldGDP, deltaGDP, newGDP
		let government
		let multiplicator
		let isRaise
		do {
			isRaise = getRandom(0, 50) < 50
			government = this.getGovernment()
			marginalC = this.getCostsCurve()[1]
			taxRate = this.getCostsCurve()[1]

			multiplicator = parseFloat((1 / (1 - marginalC * (1 - taxRate))).toFixed(2))

			oldGDP = multiplicator * government
			deltaGDP = multiplicator * marginalC * government
			const y1 = multiplicator * oldGDP
			const y2 = multiplicator * marginalC * oldGDP
			newGDP = isRaise ? y1 + y2 : y1 - y2
		}
		while (newGDP * 100 % 1 != 0 || newGDP <= 0)

		this.taskString = `
		Vláda ${!isRaise ? "sníží" : "zvýší"} vládní nákupy statků a služeb o ${government} mld. Kč a současně ${!isRaise ? "zvýší" : "sníží"} transferové platby ve stejné výši. Mezní sklon ke spotřebě je ${marginalC} a daňová sazba ${taxRate}. 
		`
		this.taskAnswer = this.createAnswerDiv() as HTMLDivElement
		this.answers = [multiplicator, newGDP]
	}

	public createAnswerDiv() {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputA = document.createElement('input')
		inputA.setAttribute("type", "text")
		inputA.setAttribute("id", `task-${this.taskNumber}-answer-a`)
		const inputB = document.createElement('input')
		inputB.setAttribute("type", "text")
		inputB.setAttribute("id", `task-${this.taskNumber}-answer-b`)
		answerDiv.innerHTML = `
			a) Jaká je hodnota multiplikátoru ${inputA.outerHTML}
			<br>b) Jaký dopad bude mít toto rozhodnutí na výši rovnovážného produktu v třísektorové ekonomice?
			<br>HDP = ${inputB.outerHTML}
			<br>
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
		const inputA = document.getElementById(`task-${this.taskNumber}-answer-a`) as HTMLInputElement
		const inputB = document.getElementById(`task-${this.taskNumber}-answer-b`) as HTMLInputElement
		const [answerA, answerB] = this.answers
		inputA.style.background = parseFloat(inputA.value) == answerA ? Colors.green : Colors.red
		inputB.style.background = inputB.value == answerB.toFixed(0) ? Colors.green : Colors.red
	}

	private getCostsCurve = () => {
		const autonomicCost = getRandom(100, 1000)
		const disposableCostsC = getRandomFloatFixed1(1.0, 0.1)
		return [autonomicCost, disposableCostsC]
	}

	private getGovernment = () => {
		return getRandom(1, 50)
	}

	public getTaskAnswer() { return this.taskAnswer }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }


}