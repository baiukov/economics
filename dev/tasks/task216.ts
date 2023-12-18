import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'

export class Task216 implements ITask {
	private taskNumber = 216;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<number | string>
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {

		let demandC, demandK, quantity, price
		do {
			demandC = getRandom(100, 10)
			demandK = getRandom(5, -5)
			demandK += demandK === 0 ? 1 : 0
			quantity = getRandom(100, 10)
			price = demandC + (demandK * quantity)
		} while (price % 1 != 0 || price <= 0 || quantity % 4 !== 0 || price % 4 !== 0)
		const place = getRandom(3, 0)

		const quantities = []
		const prices = []
		for (let i = 0; i < 4; i++) {
			let q, p
			if (place === i) {
				q = quantity
				p = price
			} else {
				if (place > i) {
					q = Math.round(quantity * getRandomFloat(0.7, 0.4))
					p = Math.round(price * getRandomFloat(0.7, 0.4))
				} else {
					q = Math.round(quantity * getRandomFloat(2.5, 1.5))
					p = Math.round(price * getRandomFloat(2.5, 1.5))
				}
			}
			quantities.push(q)
			prices.push(p)
		}

		this.taskString = `
			Určete rovnovážnou cenu a množství na trhu, pokud znáte následující údaje. Poptávka je 
			dána funkcí P = ${demandC} ${demandK < 0 ? "-" + -demandK : "+" + demandK}Q a nabídka je popsána tabulkou: 
			<table>
				<tr>
					<td>Cena</td>
					<td>${prices[0]}</td>
					<td>${prices[1]}</td>
					<td>${prices[2]}</td>
					<td>${prices[3]}</td>
				</tr>
					<td>Množství</td>
					<td>${quantities[0]}</td>
					<td>${quantities[1]}</td>
					<td>${quantities[2]}</td>
					<td>${quantities[3]}</td>
			</table>
		`
		this.answerHTML = this.createAnswerDiv(price) as HTMLDivElement
		this.answers = [price, quantity]
	}

	public createAnswerDiv(price: number) {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputP = document.createElement('input')
		inputP.setAttribute("type", "text")
		inputP.setAttribute("id", `task-${this.taskNumber}-answer-p`)
		const inputQ = document.createElement('input')
		inputQ.setAttribute("type", "text")
		inputQ.setAttribute("id", `task-${this.taskNumber}-answer-q`)

		answerDiv.innerHTML = `
			Q = ${inputQ.outerHTML}<br>
			P = ${inputP.outerHTML}<br>
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
		const inputP = document.getElementById(`task-${this.taskNumber}-answer-p`) as HTMLInputElement
		const inputQ = document.getElementById(`task-${this.taskNumber}-answer-q`) as HTMLInputElement
		const [p, q] = this.answers
		inputP.style.background = parseInt(inputP.value) === p ? Colors.green : Colors.red
		inputQ.style.background = parseInt(inputQ.value) === q ? Colors.green : Colors.red
	}

	public getTaskAnswer() { return this.answerHTML }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }
}