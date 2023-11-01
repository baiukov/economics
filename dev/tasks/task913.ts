import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'

export class Task913 implements ITask {
	private taskNumber = 913;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: number[] = []
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {
		//a
		let q: number
		let delta: number, marginalCost: number
		let totalRevenues: number[], prices: number[], quantities: number[], marginalRevenues: number[], totalCosts: number[]
		let incomes: number[]
		let isCorrect = true
		do {
			delta = getRandom(1, 4) // 1,5
			marginalCost = getRandomFloat(1, 5) // 1,5
			const startQuantity = getRandom(1, 20) // 1,20
			prices = []
			quantities = []
			totalRevenues = []
			marginalRevenues = []
			incomes = []
			totalCosts = []
			for (let i = 0; i < 5; i++) {
				const price = 5 - i
				prices.push(price)
				const q = startQuantity + delta * (i + 1)
				quantities.push(q)
				const totalRevenue = price * q
				totalRevenues.push(totalRevenue)
				const lastTR = i == 0 ? 0 : totalRevenues[i - 1]
				const lastQ = i == 0 ? 0 : quantities[i - 1]
				const deltaTR = totalRevenue - lastTR
				const deltaQ = q - lastQ
				const marginalRevenue = deltaTR / deltaQ
				marginalRevenues.push(marginalRevenue)
				const totalCost = marginalCost * q
				totalCosts.push(totalCost)
				const z = totalRevenue - totalCost
				incomes.push(z)
			}
		} while (Math.max(...incomes) * 10 % 1 != 0)
		const maxRevenue = Math.max(...totalRevenues)
		const maxIncome = Math.max(...incomes)
		const indexA = incomes.indexOf(maxIncome)
		const indexB = totalRevenues.indexOf(maxRevenue)

		this.taskString = `
		V podmínkách nedokonalé konkurence je poptávková křivka pro firmu následující 
		<table>
			<tr>
				<td>P (EUR)</td>
				<td>${prices[0]}</td>
				<td>${prices[1]}</td>
				<td>${prices[2]}</td>
				<td>${prices[3]}</td>
				<td>${prices[4]}</td>
			</tr>
			<tr>
				<td>Q (ks)</td>
				<td>${quantities[0]}</td>
				<td>${quantities[1]}</td>
				<td>${quantities[2]}</td>
				<td>${quantities[3]}</td>
				<td>${quantities[4]}</td>
			</tr>
		</table>
		MC jsou konstantní ve výši ${marginalCost} EUR. `
		this.answerHTML = this.createAnswerDiv(marginalCost) as HTMLDivElement
		this.answers = [quantities[indexA], prices[indexA], quantities[indexB], prices[indexB]]
	}


	public createAnswerDiv(marginalCost: number) {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputAQ = document.createElement('input')
		inputAQ.setAttribute("type", "text")
		inputAQ.setAttribute("id", `task-${this.taskNumber}-answer-aQ`)
		const inputAP = document.createElement('input')
		inputAP.setAttribute("type", "text")
		inputAP.setAttribute("id", `task-${this.taskNumber}-answer-aP`)
		const inputBQ = document.createElement('input')
		inputBQ.setAttribute("type", "text")
		inputBQ.setAttribute("id", `task-${this.taskNumber}-answer-bQ`)
		const inputBP = document.createElement('input')
		inputBP.setAttribute("type", "text")
		inputBP.setAttribute("id", `task-${this.taskNumber}-answer-bP`)
		answerDiv.innerHTML = `
			a) Určete, na které úrovni ceny a množství firma realizuje nejvyšší zisk
			<br>Q = ${inputAQ.outerHTML}. P = ${inputAP.outerHTML} 
			<br>b) Určete úroveň výstupu a cenu, při které bude firma maximalizovat obrat.
			<br>Q = ${inputBQ.outerHTML}. P = ${inputBP.outerHTML}
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
		const inputAQ = document.getElementById(`task-${this.taskNumber}-answer-aQ`) as HTMLInputElement
		const inputAP = document.getElementById(`task-${this.taskNumber}-answer-aP`) as HTMLInputElement
		const inputBQ = document.getElementById(`task-${this.taskNumber}-answer-bQ`) as HTMLInputElement
		const inputBP = document.getElementById(`task-${this.taskNumber}-answer-bP`) as HTMLInputElement
		const [answerAQ, answerAP, answerBQ, answerBP] = this.answers
		inputAQ.style.background = parseInt(inputAQ.value) == answerAQ ? Colors.green : Colors.red
		inputAP.style.background = parseFloat(inputAP.value) == answerAP ? Colors.green : Colors.red
		inputBQ.style.background = parseInt(inputBQ.value) == answerBQ ? Colors.green : Colors.red
		inputBP.style.background = parseInt(inputBP.value) == answerBP ? Colors.green : Colors.red
	}

	public getTaskNumber() { return this.taskNumber }

	public getTaskString() { return this.taskString }

	public getTaskAnswer() { return this.answerHTML }

}