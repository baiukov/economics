import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'

export class Task2314 implements ITask {
	private taskNumber: number = 2314;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined
	private answers: string[] = []
	private pageBuilder = PageBuilder.getPageBuilder()

	public constructor() {


		const rezerves = getRandom(100, 10)
		const deposits = getRandom(500, 100)
		const timeDeposits = getRandom(1500, 300)
		const stock = getRandom(2000, 1000)

		const m1 = deposits
		const m2 = m1 + timeDeposits
		const m3 = m2 + stock


		this.taskString = `
			Bankovní rezervy ekonomiky činí celkem ${rezerves} mld. Veškeré peněžní zůstatky mají podobu bankvních vkladů. Vklady na běžných účtech činí celkem ${deposits} mld. Termínované vklady činí celkem ${timeDeposits} mld. Cenné papíry v rukou domácích subjektů jsou odhadovány na ${stock} mld. Vypočítejte peněžní agregatory: 
		`
		this.taskAnswer = this.createAnswerDiv() as HTMLDivElement
		this.answers = [m1.toString(), m2.toString(), m3.toString()]
	}

	public createAnswerDiv() {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputM1 = document.createElement('input')
		inputM1.setAttribute("type", "text")
		inputM1.setAttribute("id", `task-${this.taskNumber}-answer-m1`)
		const inputM2 = document.createElement('input')
		inputM2.setAttribute("type", "text")
		inputM2.setAttribute("id", `task-${this.taskNumber}-answer-m2`)
		const inputM3 = document.createElement('input')
		inputM3.setAttribute("type", "text")
		inputM3.setAttribute("id", `task-${this.taskNumber}-answer-m3`)
		answerDiv.innerHTML = `
			a) M1 = ${inputM1.outerHTML}
			<br>b) M2 = ${inputM2.outerHTML}
			<br>c) M3 = ${inputM3.outerHTML}
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
		const inputM1 = document.getElementById(`task-${this.taskNumber}-answer-m1`) as HTMLInputElement
		const inputM2 = document.getElementById(`task-${this.taskNumber}-answer-m2`) as HTMLInputElement
		const inputM3 = document.getElementById(`task-${this.taskNumber}-answer-m3`) as HTMLInputElement
		const [answerM1, answerM2, answerM3] = this.answers
		inputM1.style.background = inputM1.value == answerM1 ? Colors.green : Colors.red
		inputM2.style.background = inputM2.value == answerM2 ? Colors.green : Colors.red
		inputM3.style.background = inputM3.value == answerM3 ? Colors.green : Colors.red
	}

	public getTaskAnswer() { return this.taskAnswer }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }
}