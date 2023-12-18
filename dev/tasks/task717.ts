import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getLabourPrice } from '../utils/getLabourPrice.js'
import { getRandom } from '../utils/getRandom.js'
import { getTotalProductCurve } from '../utils/getTotalProductCurve.js'

export class Task717 implements ITask {
	private taskNumber = 717;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<number | string>
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {
		const productPrice = this.getProductPrice()
		let labourPrice: number = 0
		const capitalAmount = this.getCapital()
		const capitalPrice = this.getCapitalPrice()
		const labour: number[] = [0, 1, 2, 3, 4, 5]
		const capital: number[] = []
		const totalCosts: number[] = []
		const totalProductions: number[] = []
		let [productionK1, productionK2] = [0, 0]
		let marginalCosts: number[] = []


		labour.forEach((l) => {
			capital.push(capitalAmount)

			if (l == 0) {
				totalProductions.push(0)
				marginalCosts.push(Infinity)
				totalCosts.push(capitalAmount * capitalPrice)
			} else {
				let marginalCost
				let quantity = 0
				do {
					if (!productionK1) [productionK1, productionK2] = getTotalProductCurve()
					labourPrice = getLabourPrice()
					const totalCost = (capitalAmount * capitalPrice) + l * labourPrice
					totalCosts.push(totalCost)
					// console.log(`Q = ${productionK1}L + ${productionK2}L**2`)
					quantity = productionK1 * l + (productionK2 * Math.pow(l, 2))
					// console.log("Q= ", quantity)
					const deltaQ = quantity - totalProductions[l - 1]
					// console.log("lastQ = ", totalProductions[l - 1], deltaQ)
					const deltaTC = totalCost - totalCosts[l - 1]
					// console.log("lastTC = ", totalCosts[l - 1], deltaTC)
					marginalCost = deltaQ / deltaTC
					// console.log(deltaQ, deltaTC)
				} while (false)
				totalProductions.push(quantity)
				// console.log(marginalCost)
			}
		})
		const fixedCosts = capitalAmount * capitalPrice


		const task = `
		Cena jednotky kapitálu je ${capitalAmount} Kč, cena jednotky práce je ${labourPrice} Kč, cena produktu je ${productPrice} Kč. Ostatní údaje obsahuje tabulka. Určete:
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
		let question = getRandom(0, 99) < 50

		this.taskString = task
		this.answerHTML = this.createAnswerDiv(question) as HTMLDivElement
		this.answers = [
			question ? totalProductions[0] : 0,
			"V krátkém období"
		]
		let totalRevenues = []
		for (let i = 0; i < 6; i++) {
			totalRevenues.push(totalProductions[i] * 2)
		}
	}

	public createAnswerDiv(question: boolean) {
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
			a) Při jakém ${question ? "Q" : "L"} bude firma v rovnováze na trhu zboží a služeb.
			<br>${question ? "Q" : "L"} = ${inputAQ.outerHTML}
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