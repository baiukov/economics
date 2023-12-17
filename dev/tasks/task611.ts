import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'

export class Task611 implements ITask {
	private taskNumber = 611;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<number>
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {

		let capital, quantities = [0], labours = [0, 1]
		let qA, fixedCosts
		let qB, totalCosts
		let capitalPrice, wage
		do {
			capital = getRandom(10, 1)
			quantities.push(getRandom(10, 2))
			for (let i = 2; i < 4; i++) {
				labours.push(i)
				const quantity = quantities[i - 1] + getRandom(quantities[i - 1], 1)
				quantities.push(quantity)
			}

			capitalPrice = getRandom(100, 10)
			wage = getRandom(150, 50)

			qA = quantities[getRandom(quantities.length - 1, 1)]
			const bIndex = getRandom(quantities.length - 1, 1)
			qB = quantities[bIndex]

			fixedCosts = capitalPrice * capital
			totalCosts = fixedCosts + labours[bIndex] * wage
		} while (fixedCosts % 1 != 0 || fixedCosts <= 0 || totalCosts % 1 != 0 || totalCosts <= 0)

		this.taskString = `
			Výrobní proces ve firmě vyrábějící zahradní nábytek je popsán v tabulce: 
			<table>
				<tr>
					<td>L</td>
					<td>0</td>
					<td>1</td>
					<td>2</td>
					<td>3</td>
				</tr>
				<tr>
					<td>K</td>
					<td>${capital}</td>
					<td>${capital}</td>
					<td>${capital}</td>
					<td>${capital}</td>
				</tr>
				<tr>
					<td>Q</td>
					<td>${quantities[0]}</td>
					<td>${quantities[1]}</td>
					<td>${quantities[2]}</td>
					<td>${quantities[3]}</td>
			</tr>
			</table>
			Cena za týdenní pronájem jedné jednotky kapitálového statku je ${capitalPrice} EUR, týdenní mzda jednoho zaměstnance firmy je ${wage} EUR. 
		`
		this.answerHTML = this.createAnswerDiv(qA, qB) as HTMLDivElement
		this.answers = [fixedCosts, totalCosts]
	}

	public createAnswerDiv(qA: number, qB: number) {
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
			a) Určete FC odpovídající úrovni produkce Q = ${qA}. ${inputA.outerHTML}<br>
			b) Určete TC odpovídající úrovni produkce Q = ${qB}. ${inputB.outerHTML}<br>
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
		const [fixedCosts, totalCosts] = this.answers

		const inputA = document.getElementById(`task-${this.taskNumber}-answer-A`) as HTMLInputElement
		const inputB = document.getElementById(`task-${this.taskNumber}-answer-B`) as HTMLInputElement

		inputA.style.background = inputA.value === fixedCosts.toString() ? Colors.green : Colors.red
		inputB.style.background = inputB.value === totalCosts.toString() ? Colors.green : Colors.red
	}

	public getTaskAnswer() { return this.answerHTML }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }
}