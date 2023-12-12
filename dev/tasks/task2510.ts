import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'

export class Task2510 implements ITask {
	private taskNumber = 2510
	private taskString: string | undefined
	private answers: number[] = []
	private taskAnswer: HTMLDivElement | undefined
	private pageBuilder = PageBuilder.getPageBuilder()

	constructor() {

		const unActivePersons = [
			"studentů",
			"invalidních důchodců",
			"starobních důchodců",
			"dětí",
		]
		const total = getRandom(30, 2) * 1000

		const activ = Math.floor((getRandomFloat(total * 0.9, total * 0.6)))
		const inaktiv = total - activ

		const employed = Math.floor(getRandomFloat(activ * 0.95, activ * 0.8)) * 1000
		const unemployed = (activ * 1000) - employed

		const randomGroupName = unActivePersons[getRandom(unActivePersons.length - 1, 0)]
		const randomGroupAmount = Math.floor(getRandomFloat(inaktiv * 0.4, inaktiv * 0.1)) * 1000

		const unemployment = (unemployed / (activ * 1000)) * 100
		this.taskString = `
			O sledované ekonomice víme následující: celkový počet obyvatel je ${total / 1000} mil. lidí; nezaměstnaných je ${unemployed}; ${randomGroupName} ${randomGroupAmount} lidí; počet zaměstnaných je ${employed} lidí. Vypočítejte:
		`
		this.answers.push(activ, inaktiv, unemployment)
		this.taskAnswer = this.createAnswerHTML() as HTMLDivElement
	}

	private createAnswerHTML = () => {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputEA = document.createElement('input')
		inputEA.setAttribute("type", "text")
		inputEA.setAttribute("id", `task-${this.taskNumber}-answer-ea`)
		const inputEN = document.createElement('input')
		inputEN.setAttribute("type", "text")
		inputEN.setAttribute("id", `task-${this.taskNumber}-answer-en`)
		const inputU = document.createElement('input')
		inputU.setAttribute("type", "text")
		inputU.setAttribute("id", `task-${this.taskNumber}-answer-u`)

		answerDiv.innerHTML += `
			a) Počet ekonomicky aktivních obyvatel ${inputEA.outerHTML} <br>
			b) Počet ekonomicky neaktivních obyvatel ${inputEN.outerHTML} <br>
			c) Míru nezaměstnanosti ${inputU.outerHTML} %<br>
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
		const inputEA = document.getElementById(`task-${this.taskNumber}-answer-ea`) as HTMLInputElement
		const inputEN = document.getElementById(`task-${this.taskNumber}-answer-en`) as HTMLInputElement
		const inputU = document.getElementById(`task-${this.taskNumber}-answer-u`) as HTMLInputElement
		const [activ, inactiv, unemployment] = this.answers
		inputEA.style.background = inputEA.value == (activ * 1000).toString() ? Colors.green : Colors.red
		inputEN.style.background = inputEN.value == (inactiv * 1000).toString() ? Colors.green : Colors.red
		inputU.style.background = inputU.value == unemployment.toFixed(2) ? Colors.green : Colors.red
	}

	public getTaskNumber = () => { return this.taskNumber }
	public getTaskString = () => { return this.taskString }
	public getTaskAnswer = () => { return this.taskAnswer }
}