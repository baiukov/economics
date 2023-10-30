import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getTotalProductCurve } from '../utils/getTotalProductCurve.js'

export class Task717 implements ITask {
	private taskNumber = 717;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<number | string>
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {
		//a
		let productPrice = this.getProductPrice()
		let productionK1: number, productionK2: number
		let capitalPrice: number
		let labourPrice: number
		let marginalRevenues: number[] = []
		let totalProductions: number[] = []
		let capitalAmount
		let marginalProductC: number, marginalProductK: number
		let labourPriceIndex: number
		do {
			[productionK1, productionK2] = getTotalProductCurve()
			capitalPrice = this.getCapitalPrice()
			capitalAmount = this.getCapital();
			[marginalProductC, marginalProductK] = [productionK1, productionK2 * 2]
			for (let l = 0; l < 6; l++) {
				marginalRevenues.push(marginalProductC + (marginalProductK * l))
				totalProductions.push(productionK1 * l + (productionK2 * Math.pow(l, 2)))
			}
			labourPriceIndex = getRandom(marginalRevenues.length, 0)
			labourPrice = marginalRevenues[labourPriceIndex]
		} while (false)
		//b

		//c
		const task = `
		Cena jednotky kapitálu je 200 Kč, cena jednotky práce je 150 Kč, cena produktu je 30 Kč. Ostatní údaje obsahuje tabulka. Určete:
		<table>
			<tr>
				<td class='header'>L</td>
				<td class='header'>K</td>
				<td class='header'>Q</td>
			</tr>
			<tr>
				<td>0</td>
				<td>${capitalAmount}</td>
				<td>${totalProductions[0]}</td>
			</tr>
				<tr>
				<td>1</td>
				<td>${capitalAmount}</td>
				<td>${totalProductions[1]}</td>
			</tr>
			<tr>
				<td>2</td>
				<td>${capitalAmount}</td>
				<td>${totalProductions[2]}</td>
			</tr>
			<tr>
				<td>3</td>
				<td>${capitalAmount}</td>
				<td>${totalProductions[3]}</td>
			</tr>
			<tr>
				<td>4</td>
				<td>${capitalAmount}</td>
				<td>${totalProductions[4]}</td>
			</tr>
			<tr>
				<td>5</td>
				<td>${capitalAmount}</td>
				<td>${totalProductions[5]}</td>
			</tr>
		</table>
		`

		this.taskString = task
		this.answerHTML = this.createAnswerDiv() as HTMLDivElement
		this.answers = [totalProductions[labourPriceIndex], "V krátkém období"]
	}

	public createAnswerDiv() {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputAQ = document.createElement('input')
		inputAQ.setAttribute("type", "text")
		inputAQ.setAttribute("id", `task-${this.taskNumber}-answer-aQ`)
		const inputB = document.createElement('input')
		inputB.setAttribute("type", "text")
		inputB.setAttribute("id", `task-${this.taskNumber}-answer-cB`)
		answerDiv.innerHTML = `
			a) Při jakém Q bude firma v rovnováze na trhu zboží a služeb.
			<br>Q = ${inputAQ.outerHTML}
			<br>b) V jakém období se nacházíme?
			<br>${inputB.outerHTML}<br>
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
		const inputB = document.getElementById(`task-${this.taskNumber}-answer-cB`) as HTMLInputElement
		const [answerAQ, answerB] = this.answers
		inputAQ.style.background = parseInt(inputAQ.value) == answerAQ ? Colors.green : Colors.red
		inputB.style.background = inputB.value == answerB ? Colors.green : Colors.red
	}

	private getCapitalPrice = () => {
		const price: number = getRandom(50, 300)
		return price
	}

	private getProductPrice = () => {
		const productPrice = getRandom(1, 50)
		return productPrice
	}

	private getCapital = () => {
		const capital: number = getRandom(1, 10)
		return capital
	}


	public getTaskNumber() { return this.taskNumber }

	public getTaskString() { return this.taskString }

	public getTaskAnswer() { return this.answerHTML }

}