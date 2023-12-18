import { ITask } from '../Itask.js'
import { determinations } from '../configs/determinationsConfig.js'
import { shuffle } from '../utils/shuffle.js'

export class Task0 implements ITask {
	private taskNumber = 0
	private taskString: string | undefined
	private taskAnswer: HTMLDivElement | undefined

	constructor() {
		this.taskString = ``

		const inputTaskContainer = document.createElement("div")

		const generateButton = document.createElement('button')
		generateButton.setAttribute('id', `task-${this.taskNumber}-generate`)
		generateButton.innerHTML = "Generate"
		generateButton.addEventListener('click', () => {
			this.generateTask(inputTaskContainer)
		})
		inputTaskContainer.appendChild(generateButton)

		this.taskAnswer = inputTaskContainer
	}

	private generateTask = (output: HTMLDivElement) => {
		let amount: number = 1
		if (!amount) return
		amount = amount > determinations.length ? determinations.length : amount
		const currentDets = shuffle(determinations)
		const tasksDiv = document.createElement("div")
		for (let i = 0; i < amount; i++) {
			const currentDet = currentDets[i]

			const div = document.createElement("div")
			div.innerHTML = currentDet.name + "<br>"
			const button = document.createElement("button")
			button.setAttribute("id", `button-${this.taskNumber}-${i}`)
			button.addEventListener('click', () => {
				this.check(div, currentDet.explanation)
			})
			button.innerText = "Show"
			div.appendChild(button)
			tasksDiv.innerHTML += "<br>"
			tasksDiv.appendChild(div)
		}
		output.appendChild(tasksDiv)
	}

	public check = (div: HTMLDivElement, answer: string) => {
		div.innerHTML += `<br> ${answer} <br>`
	}

	public getTaskNumber = () => { return this.taskNumber }
	public getTaskString = () => { return this.taskString }
	public getTaskAnswer = () => { return this.taskAnswer }

}