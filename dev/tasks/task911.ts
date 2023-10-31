import { ITask } from '../Itask'
import { PageBuilder } from '../pageBuilder.js'
import { alphabet } from '../utils/alphabet.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'
import { shuffle } from '../utils/shuffle.js'

export class Task911 implements ITask {
	private taskNumber: number = 911;
	private answerHTML: HTMLDivElement | undefined
	private taskString: string | undefined
	private pageBuilder = PageBuilder.getPageBuilder()
	private answers: string[] = []

	public constructor() {
		const isEqual = getRandom(0, 99) < 20
		const isBigger = isEqual ? false : getRandom(0, 99) < 50

		const marginalCost = getRandomFloat(1.1, 9.9)
		console.log("MC:", marginalCost)
		const marginalRevenue = isEqual ? marginalCost : (isBigger ? getRandomFloat(marginalCost, 10.0) : getRandomFloat(1.0, marginalCost))

		this.taskString = `
		Monopolní firma zjistí, že na současné úrovni produkce je MR ${marginalRevenue.toFixed(1)} Kč a MC jsou ${marginalCost.toFixed(1)} Kč. Která z následujících operací bude maximalizovat zisk ?
		<br>
		`

		const answers = [
			"ponechat P i Q stejné",
			"zvýšit P",
			"zvýšit P a snížit Q",
			"snížit P a zvýšit Q",
			"snížit P"
		]
		const correctAnswer = isEqual ? answers[0] : isBigger ? answers[3] : answers[2]
		this.answerHTML = this.createAnswerHTML(answers, correctAnswer) as HTMLDivElement
		let answer = []
	}

	public createAnswerHTML(answers: string[], correctAnswer: string) {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const input = document.createElement('input')
		input.setAttribute("type", "text")
		input.setAttribute("id", `task-${this.taskNumber}-answer`)

		let answersShuffled = shuffle(answers)
		let answerLetter: string = "a"
		for (let i = 0; i < answersShuffled.length; i++) {
			answerDiv.innerHTML += `${alphabet[i]}) ${answersShuffled[i]}<br>`
			if (answersShuffled[i] == correctAnswer) {
				answerLetter = alphabet[i]
			}
		}
		this.answers = [answerLetter]
		answerDiv.innerHTML += input.outerHTML

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
		const input = document.getElementById(`task-${this.taskNumber}-answer`) as HTMLInputElement
		const answer = this.answers[0]
		input.style.background = input.value.toLowerCase() == answer ? Colors.green : Colors.red
	}

	public getTaskAnswer() { return this.answerHTML }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }

}