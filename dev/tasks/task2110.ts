import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getCostsMethod } from '../utils/getCostsMethod.js'
import { getIncomeMetod } from '../utils/getIncomeMethod.js'
import { getRandom } from '../utils/getRandom.js'

export class Task2110 implements ITask {
	private taskNumber = 2110;
	private taskHTML: HTMLDivElement | undefined
	private task: string | undefined
	private pageBuilder = PageBuilder.getPageBuilder()
	private answer: string | undefined

	public constructor() {
		const isCostsMethod = getRandom(0, 99) < 50

		let [taskString, GDP] = isCostsMethod ? getCostsMethod() : getIncomeMetod()
		taskString = taskString.toString()
		this.task = taskString
		this.answer = GDP as string
		this.taskHTML = this.createAnswerHTML() as HTMLDivElement
	}

	private createAnswerHTML = () => {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const input = document.createElement('input')
		input.setAttribute("type", "text")
		input.setAttribute("id", `task-${this.taskNumber}-answer-HDP`)

		answerDiv.innerHTML += `HDP = ${input.outerHTML} <br>`

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
		const input = document.getElementById(`task-${this.taskNumber}-answer-HDP`) as HTMLInputElement
		const answer = this.answer
		input.style.background = input.value == answer ? Colors.green : Colors.red
	}

	public getTaskNumber = () => { return this.taskNumber }
	public getTaskAnswer = () => { return this.taskHTML }
	public getTaskString = () => { return this.task }
}