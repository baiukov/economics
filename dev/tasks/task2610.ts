import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'


export class Task2610 implements ITask {
	private taskNumber = 2610;
	private taskHTML: HTMLDivElement | undefined
	private task: string | undefined
	private pageBuilder = PageBuilder.getPageBuilder()
	private answer: string[] = []

	public constructor() {
		const nominalGDP1 = getRandom(10, 90) * 100
		const nominalGDP2 = getRandom(10, 90) * 100

		const realGDP1 = getRandom(10, 90) * 100
		const realGDP2 = getRandom(10, 90) * 100

		const deltaNominalGDP = nominalGDP2 - nominalGDP1
		const deltaRealGDP = realGDP2 - realGDP1

		const d1 = (nominalGDP1 / realGDP1) * 100
		const d2 = (nominalGDP2 / realGDP2) * 100

		const inflation = d2 - d1

		this.task = `
			Ve sledovaném období se nominální HDP ${deltaNominalGDP > 0 ? "zvýšil" : "snížil"} z ${nominalGDP1} mld. Kč na ${nominalGDP2} mld. Kč. Reální HDP ${deltaRealGDP > 0 ? "zvýšil" : "snížil"} z ${realGDP1} mld. Kč na ${realGDP2} mld. Kč. Zjistěte pomocí deflátoru HDP jaká je ve sledovaném odbobí míra inflace 
		`
		this.taskHTML = this.createAnswerHTML() as HTMLDivElement
		this.answer = [inflation.toFixed(2)]
	}

	private createAnswerHTML = () => {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputInflation = document.createElement('input')
		inputInflation.setAttribute("type", "text")
		inputInflation.setAttribute("id", `task-${this.taskNumber}-answer-p`)

		answerDiv.innerHTML += `
		π = ${inputInflation.outerHTML} <br>
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
		const inputInflation = document.getElementById(`task-${this.taskNumber}-answer-p`) as HTMLInputElement
		const [p] = this.answer
		inputInflation.style.background = inputInflation.value == p ? Colors.green : Colors.red
	}

	public getTaskNumber = () => { return this.taskNumber }
	public getTaskAnswer = () => { return this.taskHTML }
	public getTaskString = () => { return this.task }
}