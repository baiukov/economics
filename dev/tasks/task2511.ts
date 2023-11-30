import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'

export class Task2511 implements ITask {
	private taskNumber = 2511
	private taskString: string | undefined
	private answers: number[] = []
	private taskAnswer: HTMLDivElement | undefined
	private pageBuilder = PageBuilder.getPageBuilder()

	constructor() {

		const realUnemployment = getRandom(2, 15)
		const natureUnemployment = getRandom(realUnemployment, 1)

		this.taskString = `
			Zjistěte náklady cyklické nezaměstnanosti v podobě odchylky skutečné vytvořeného produktu od potenciálního produktu, jestliže víme, že skutečná míra nezaměstnanosti činí ${realUnemployment} % přírozená míra nezaměstnanosti je ${natureUnemployment} %.
		`
		const dY = (realUnemployment - natureUnemployment) * 2.5
		this.answers = [dY]
		this.taskAnswer = this.createAnswerHTML() as HTMLDivElement
	}

	private createAnswerHTML = () => {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputdY = document.createElement('input')
		inputdY.setAttribute("type", "text")
		inputdY.setAttribute("id", `task-${this.taskNumber}-answer-dY`)

		answerDiv.innerHTML += `
		ΔY ≈ ${inputdY.outerHTML}% <br>
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
		const inputdY = document.getElementById(`task-${this.taskNumber}-answer-dY`) as HTMLInputElement
		const [dY] = this.answers
		inputdY.style.background = inputdY.value == dY.toString() ? Colors.green : Colors.red
	}

	public getTaskNumber = () => { return this.taskNumber }
	public getTaskString = () => { return this.taskString }
	public getTaskAnswer = () => { return this.taskAnswer }
}