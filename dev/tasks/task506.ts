import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'

export class Task506 implements ITask {
	private taskNumber = 506;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<Array<number>>
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {

		let coefficient, firstQ, isValid = true
		let quantities = [], marginalProducts = [], averageProducts = []
		do {
			quantities = [0], marginalProducts = [], averageProducts = []
			coefficient = getRandom(3, 1)
			firstQ = getRandom(coefficient * 15, coefficient * 5)
			for (let i = 1; i < 6; i++) {
				const quatity = firstQ + (quantities[i - 1] - (coefficient * i))
				quantities.push(quatity)
				const marginalProduct = quatity - quantities[i - 1]
				marginalProducts.push(marginalProduct)
				const averageProduct = quatity / i
				averageProducts.push(averageProduct)
			}

			for (let i = 1; i < 5; i++) {
				isValid = isValid && (marginalProducts[i] * 10 % 1 == 0 || averageProducts[i] * 10 % 1 == 0)
			}

		} while (!isValid)

		this.taskString = `
			Vyjděte z údajů obsažených v následující tabulce : 
			<table>
				<tr>
					<td>L</td>
					<td>0</td>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
				</tr>
				<tr>
					<td>Q</td>
					<td>${quantities[0]}</td>
					<td>${quantities[1]}</td>
					<td>${quantities[2]}</td>
					<td>${quantities[3]}</td>
					<td>${quantities[4]}</td>
					<td>${quantities[5]}</td>
				</tr>
			</table>
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
		for (let i = 0; i < 5; i++) {
			const inputAP = document.createElement('input')
			inputAP.setAttribute("type", "text")
			inputAP.setAttribute("id", `task-${this.taskNumber}-answer-AP${i}`)

			const inputMP = document.createElement('input')
			inputMP.setAttribute("type", "text")
			inputMP.setAttribute("id", `task-${this.taskNumber}-answer-MP${i}`)

			APInputs.push(inputAP)
			MPInputs.push(inputMP)
		}
		const inputIf = document.createElement('input')
		inputIf.setAttribute("type", "text")
		inputIf.setAttribute("id", `task-${this.taskNumber}-answer-if`)

		answerDiv.innerHTML = `
			Jedná se o tabulku jednofaktorové (krátkodobé) produkční funkce, úroveň ostatních
				používaných vstupů je fixní. 
			a) Určete TP, AP, MP faktoru práce. <br>
			<table>
				<tr>
					<td>AP</td>
					<td>-</td>
					<td>${APInputs[0].outerHTML}</td>
					<td>${APInputs[1].outerHTML}</td>
					<td>${APInputs[2].outerHTML}</td>
					<td>${APInputs[3].outerHTML}</td>
					<td>${APInputs[4].outerHTML}</td>
				</tr>
				<tr>
					<td>MP</td>
					<td>-</td>
					<td>${MPInputs[0].outerHTML}</td>
					<td>${MPInputs[1].outerHTML}</td>
					<td>${MPInputs[2].outerHTML}</td>
					<td>${MPInputs[3].outerHTML}</td>
					<td>${MPInputs[4].outerHTML}</td>
				</tr>
			</table>
			b) Načrtněte příslušné křivky a objasněte vzájemné vztahy mezi nimi. <br>
			c) Platí v tomto případě zákon klesajících výnosů? ${inputIf.outerHTML}<br>
			Vysvětlete vzájemný vztah mezi zákonem
			klesajícího mezního produktu a zákonem klesajících výnosů. <br>
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

		for (let i = 0; i < 5; i++) {
			const inputAP = document.getElementById(`task-${this.taskNumber}-answer-AP${i}`) as HTMLInputElement
			const inputMP = document.getElementById(`task-${this.taskNumber}-answer-MP${i}`) as HTMLInputElement

			inputAP.style.background = inputAP.value === averageProducts[i].toString() ? Colors.green : Colors.red
			inputMP.style.background = inputMP.value === marginalProducts[i].toString() ? Colors.green : Colors.red
		}
		const inputIf = document.getElementById(`task-${this.taskNumber}-answer-if`) as HTMLInputElement
		inputIf.style.background = inputIf.value === "ANO" ? Colors.green : Colors.red
	}

	public getTaskAnswer() { return this.answerHTML }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }
}