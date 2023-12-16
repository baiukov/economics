import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'

export class Task507 implements ITask {
	private taskNumber = 507;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<Array<number>>
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {

		let coefficient: number, firstQ: number, isValid = true
		let quantities = [], marginalProducts = [], averageProducts = []
		do {
			quantities = [0], marginalProducts = [], averageProducts = []
			coefficient = getRandom(3, 1)
			firstQ = getRandom(coefficient * 15, coefficient * 5)
			for (let i = 1; i < 8; i++) {
				const quatity = firstQ + (quantities[i - 1] - (coefficient * i))
				quantities.push(quatity)
				const marginalProduct = quatity - quantities[i - 1]
				marginalProducts.push(marginalProduct)
				const averageProduct = quatity / i
				averageProducts.push(averageProduct)
			}

			for (let i = 1; i < 7; i++) {
				isValid = isValid && (marginalProducts[i] * 10 % 1 == 0 || averageProducts[i] * 10 % 1 == 0)
			}

		} while (!isValid)

		this.taskString = `
			Nechť výrobce ratanových židlí vyrábí v krátkém období. Pokud počet pracovníků
			postupně poroste z 0 na 7, počet vyrobených židlí se bude vyvíjet následovně:
			${quantities}.
		`
		this.answerHTML = this.createAnswerDiv() as HTMLDivElement
		this.answers = [averageProducts, marginalProducts]
	}

	public createAnswerDiv() {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const APInputs = []
		const MPInputs = []
		for (let i = 0; i < 7; i++) {
			const inputAP = document.createElement('input')
			inputAP.setAttribute("type", "text")
			inputAP.setAttribute("id", `task-${this.taskNumber}-answer-AP${i}`)

			const inputMP = document.createElement('input')
			inputMP.setAttribute("type", "text")
			inputMP.setAttribute("id", `task-${this.taskNumber}-answer-MP${i}`)

			APInputs.push(inputAP)
			MPInputs.push(inputMP)
		}

		answerDiv.innerHTML = `
			a) Vypočtěte mezní a průměrný produkt práce. 
			<table>
				<tr>
					<td>AP</td>
					<td>-</td>
					<td>${APInputs[0].outerHTML}</td>
					<td>${APInputs[1].outerHTML}</td>
					<td>${APInputs[2].outerHTML}</td>
					<td>${APInputs[3].outerHTML}</td>
					<td>${APInputs[4].outerHTML}</td>
					<td>${APInputs[5].outerHTML}</td>
					<td>${APInputs[6].outerHTML}</td>
				</tr>
				<tr>
					<td>MP</td>
					<td>-</td>
					<td>${MPInputs[0].outerHTML}</td>
					<td>${MPInputs[1].outerHTML}</td>
					<td>${MPInputs[2].outerHTML}</td>
					<td>${MPInputs[3].outerHTML}</td>
					<td>${MPInputs[4].outerHTML}</td>
					<td>${MPInputs[5].outerHTML}</td>
					<td>${MPInputs[6].outerHTML}</td>
				</tr>
			</table>
			b) Vykazuje daná produkční funkce klesající výnosy z faktoru práce ? <br>
			c) Co může způsobit, že se MP stane záporným ? <br>
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
		const [averageProducts, marginalProducts] = this.answers

		for (let i = 0; i < 7; i++) {
			const inputAP = document.getElementById(`task-${this.taskNumber}-answer-AP${i}`) as HTMLInputElement
			const inputMP = document.getElementById(`task-${this.taskNumber}-answer-MP${i}`) as HTMLInputElement

			inputAP.style.background = inputAP.value === averageProducts[i].toString() ? Colors.green : Colors.red
			inputMP.style.background = inputMP.value === marginalProducts[i].toString() ? Colors.green : Colors.red
		}
	}

	public getTaskAnswer() { return this.answerHTML }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }
}