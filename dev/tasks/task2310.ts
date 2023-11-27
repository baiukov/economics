import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'

export class Task2310 implements ITask {
	private taskNumber = 2310;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined
	private pageBuilder = PageBuilder.getPageBuilder()
	private answers: string[]

	public constructor() {
		this.taskString = ``
		this.taskAnswer = this.createAnswerDiv() as HTMLDivElement
		this.answers = [
			"prostředek směny",
			"transakční",
			"opatrnostní",
			"spekuláční"
		]
	}

	public createAnswerDiv() {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputA = document.createElement('input')
		inputA.setAttribute("type", "text")
		inputA.setAttribute("id", `task-${this.taskNumber}-answer-a`)
		const inputB1 = document.createElement('input')
		inputB1.setAttribute("type", "text")
		inputB1.setAttribute("id", `task-${this.taskNumber}-answer-b1`)
		const inputB2 = document.createElement('input')
		inputB2.setAttribute("type", "text")
		inputB2.setAttribute("id", `task-${this.taskNumber}-answer-b2`)
		const inputB3 = document.createElement('input')
		inputB3.setAttribute("type", "text")
		inputB3.setAttribute("id", `task-${this.taskNumber}-answer-b3`)
		answerDiv.innerHTML = `
			a) Likvidita je snadnost a pohotovost přeměny aktiva bez velkých ztrát v ${inputA.outerHTML}
			<br>b) Motivy držby peněžních zůstatků jsou ${inputB1.outerHTML} motiv, ${inputB2.outerHTML} motiv a ${inputB3.outerHTML} motiv.
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
		const inputA = document.getElementById(`task-${this.taskNumber}-answer-a`) as HTMLInputElement
		const inputB1 = document.getElementById(`task-${this.taskNumber}-answer-b1`) as HTMLInputElement
		const inputB2 = document.getElementById(`task-${this.taskNumber}-answer-b2`) as HTMLInputElement
		const inputB3 = document.getElementById(`task-${this.taskNumber}-answer-b3`) as HTMLInputElement

		const [answerA, answerB1, answerB2, answerB3] = this.answers
		const correctB = [answerB1, answerB2, answerB3]
		inputA.style.background = inputA.value.toLowerCase() == answerA ? Colors.green : Colors.red
		inputB1.style.background = correctB.includes(inputB1.value.toLowerCase()) ? Colors.green : Colors.red
		console.log(correctB, correctB.includes(inputB1.value))
		correctB[correctB.indexOf(inputB1.value.toLowerCase())] = getRandom(0, 1000).toString()
		console.log(correctB)
		inputB2.style.background = correctB.includes(inputB2.value.toLowerCase()) ? Colors.green : Colors.red
		console.log(correctB, inputB2.value, correctB.includes(inputB2.value))
		correctB[correctB.indexOf(inputB2.value.toLowerCase())] = getRandom(0, 1000).toString()
		inputB3.style.background = correctB.includes(inputB3.value.toLowerCase()) ? Colors.green : Colors.red
	}

	public getTaskAnswer() { return this.taskAnswer }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }


}