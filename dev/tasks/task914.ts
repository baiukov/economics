import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'

export class Task914 implements ITask {
	private taskNumber = 914;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: string[] = []
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {
		//a
		const firstQ = getRandom(1, 100)
		const secondQ = firstQ + 1
		const price1 = parseFloat(getRandomFloat(1, 20).toFixed(1))
		const price2 = parseFloat((price1 * getRandomFloat(1.3, 0.6)).toFixed(1))

		const answer = price2 * secondQ - price1 * firstQ
		this.taskString = `
		Monopolista se snaží maximalizovat svůj celkový zisk. Může prodat ${firstQ} jednotek produkce 
		po ${price1} EUR nebo ${secondQ} jednotek po ${price2} EUR. Vypočtěte mezní příjem ${secondQ}-é prodané jednotky.`
		this.answerHTML = this.createAnswerDiv() as HTMLDivElement
		this.answers = [answer.toFixed(1)]
	}


	public createAnswerDiv() {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputA = document.createElement('input')
		inputA.setAttribute("type", "text")
		inputA.setAttribute("id", `task-${this.taskNumber}-answer-A`)
		answerDiv.innerHTML = inputA.outerHTML
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
		const inputA = document.getElementById(`task-${this.taskNumber}-answer-A`) as HTMLInputElement
		const [answerA] = this.answers
		inputA.style.background = inputA.value == answerA ? Colors.green : Colors.red
	}

	public getTaskNumber() { return this.taskNumber }

	public getTaskString() { return this.taskString }

	public getTaskAnswer() { return this.answerHTML }

}