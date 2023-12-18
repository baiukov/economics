import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'

export class Task708 implements ITask {
	private taskNumber: number = 708;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: number[]
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder()

	public constructor() {

		let totalRevenue, averageCosts, averageVariableCosts, marginalCosts, quantity, income
		const isIncomeZero = getRandom(99, 0) < 30
		do {
			totalRevenue = getRandom(10, 1) * 1000
			averageVariableCosts = getRandom(20, 2)
			marginalCosts = getRandom(20, 2)

			const price = marginalCosts
			quantity = totalRevenue / price

			averageCosts = isIncomeZero ? marginalCosts : getRandom(20, 2)
			income = totalRevenue - quantity * averageCosts
		} while (quantity % 1 != 0 || quantity <= 0 || averageCosts % 1 != 0 || income % 1 != 0)


		this.taskString = `
			TR z prodeje každodenního výstupu dokonale konkurenční firmy je ${totalRevenue} Kč. Na
			této úrovni výstupu firma maximalizuje celkový zisk. AC = ${averageCosts} Kč, AVC = ${averageVariableCosts} Kč a MC = ${marginalCosts} Kč.
		`
		this.answerHTML = this.createAnswerDiv() as HTMLDivElement
		this.answers = [quantity, income]
	}

	public createAnswerDiv() {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputA = document.createElement('input')
		inputA.setAttribute("type", "text")
		inputA.setAttribute("id", `task-${this.taskNumber}-answer-A`)
		const inputB = document.createElement('input')
		inputB.setAttribute("type", "text")
		inputB.setAttribute("id", `task-${this.taskNumber}-answer-B`)

		answerDiv.innerHTML = `
			Denní výstup (ve fyzických jednotkách) bude ${inputA.outerHTML} <br>
			Jak velký je každodenní zisk (ztráta) této firmy ${inputB.outerHTML} <br>
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
		const [a, b] = this.answers

		const inputA = document.getElementById(`task-${this.taskNumber}-answer-A`) as HTMLInputElement
		const inputB = document.getElementById(`task-${this.taskNumber}-answer-B`) as HTMLInputElement

		inputA.style.background = inputA.value === a.toString() ? Colors.green : Colors.red
		inputB.style.background = inputB.value === b.toString() ? Colors.green : Colors.red
	}

	public getTaskAnswer() { return this.answerHTML }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }
}