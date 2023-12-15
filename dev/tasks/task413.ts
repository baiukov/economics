import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'

export class Task413 implements ITask {
	private taskNumber = 413;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<number | string>
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {

		const yPrice = getRandom(10, 1)
		const coefficient = getRandom(5, 1)
		const yMarginalUtility = yPrice * coefficient
		const xPrice = getRandomFloat(5, 1.1)
		const xMarginaUtility = xPrice * coefficient


		this.taskString = `
			Cena X je ${xPrice} EUR. Cena Y je ${yPrice} EUR(-O/-A). MUy je ${yMarginalUtility} EUR(-O/-A). Spotřebitel maximalizuje užitek 
			z nákupů komodit X a Y. Jaký musí být MUx
		`
		this.answerHTML = this.createAnswerDiv() as HTMLDivElement
		this.answers = [xMarginaUtility]
	}

	public createAnswerDiv() {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputMUx = document.createElement('input')
		inputMUx.setAttribute("type", "text")
		inputMUx.setAttribute("id", `task-${this.taskNumber}-answer-MUx`)

		answerDiv.innerHTML = `
			MUx = ${inputMUx.outerHTML}<br>
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
		const inputMUx = document.getElementById(`task-${this.taskNumber}-answer-MUx`) as HTMLInputElement
		const [MUx] = this.answers
		inputMUx.style.background = parseFloat(inputMUx.value) === MUx ? Colors.green : Colors.red
	}

	public getTaskAnswer() { return this.answerHTML }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }
}