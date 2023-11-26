import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'

export class Task2311 implements ITask {
	private taskNumber = 2311;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined
	private pageBuilder = PageBuilder.getPageBuilder()
	private answers: number[]

	public constructor() {
		let purchase, rezerves, deposits, rate, delta
		do {

			purchase = getRandom(15, 1)
			rezerves = getRandom(150, purchase + 1)
			deposits = getRandom(1500, rezerves + 100)

			rate = rezerves / deposits
			delta = purchase / rate
		} while ((rate * 100 * 10) % 1 != 0 || (delta * 10) % 1 != 0 || rate > 1)

		this.taskString = `
			O bankovním systému dané ekonomiky víme následující: centrální banka se rozhodla nakoupit vládní cenné papíry ve výši ${purchase} mld. Kč, komerční banky přesně drží pouze povinné minimální rezervy a neexistuje hotovost. Povinné minimální rezervy komerčních bank činí ${rezerves} mld. Kč. Depozita u komerčních bank jsou ve výši ${deposits} mld. Kč. 
		`
		this.taskAnswer = this.createAnswerDiv() as HTMLDivElement
		this.answers = [rate * 100, delta]
	}

	public createAnswerDiv() {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputA = document.createElement('input')
		inputA.setAttribute("type", "text")
		inputA.setAttribute("id", `task-${this.taskNumber}-answer-a`)
		const inputB = document.createElement('input')
		inputB.setAttribute("type", "text")
		inputB.setAttribute("id", `task-${this.taskNumber}-answer-b`)
		answerDiv.innerHTML = `
			a) Vypočítejte sazbu povinných minimálních rezerv ${inputA.outerHTML}
			<br>b) Vypočítejte, jak se změní peněžní zásoba v dané ekonomice ${inputB.outerHTML}
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
		const inputB = document.getElementById(`task-${this.taskNumber}-answer-b`) as HTMLInputElement
		const [answerA, answerB] = this.answers
		inputA.style.background = parseFloat(inputA.value) == answerA ? Colors.green : Colors.red
		inputB.style.background = inputB.value == answerB.toFixed(0) ? Colors.green : Colors.red
	}

	public getTaskAnswer() { return this.taskAnswer }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }


}