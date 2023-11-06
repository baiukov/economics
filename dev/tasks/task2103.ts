import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { alphabet } from '../utils/alphabet.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { shuffle } from '../utils/shuffle.js'

export class Task2103 implements ITask {
	private taskNumber = 2103;
	private taskHTML: HTMLDivElement | undefined
	private task: string | undefined
	private pageBuilder = PageBuilder.getPageBuilder()
	private answer: string | undefined

	public constructor() {
		const isHDPUp = getRandom(0, 99) < 50
		const isPriceUp = getRandom(0, 99) < 50

		this.task = `Jestliže nominální HDP ${isHDPUp ? "vzrostl" : "klesl"} a cenová hladina ${isPriceUp ? "vzrostla" : "klesla"}, pak reálný HDP:`
		const answers = [
			"vzrostl",
			"klesl",
			"byl stabilní",
			"nejprvé vzrostl, pak klesl",
			"nelze jednoznačně určit"
		]

		let correctAnswerIndex
		if (!isHDPUp) {
			if (isPriceUp) {
				correctAnswerIndex = 1
			} else {
				correctAnswerIndex = 4
			}
		} else {
			if (isPriceUp) {
				correctAnswerIndex = 4
			} else {
				correctAnswerIndex = 0
			}
		}
		const correctAnswer: string = answers[correctAnswerIndex]
		const suffledAnswers = shuffle(answers)
		const newCorrectAnswerIndex: number = suffledAnswers.indexOf(correctAnswer)
		this.taskHTML = this.createAnswerHTML(answers, newCorrectAnswerIndex) as HTMLDivElement
	}

	private createAnswerHTML = (answers: string[], correctAnswerIndex: number) => {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const input = document.createElement('input')
		input.setAttribute("type", "text")
		input.setAttribute("id", `task-${this.taskNumber}-answer-test`)

		for (let i = 0; i < answers.length; i++) {
			answerDiv.innerHTML += `${alphabet[i]}) ${answers[i]} <br>`
		}
		answerDiv.appendChild(input)

		this.answer = alphabet[correctAnswerIndex]

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
		const input = document.getElementById(`task-${this.taskNumber}-answer-test`) as HTMLInputElement
		const answer = this.answer
		input.style.background = input.value.toLowerCase() == answer ? Colors.green : Colors.red
	}
	public getTaskNumber = () => { return this.taskNumber }
	public getTaskAnswer = () => { return this.taskHTML }
	public getTaskString = () => { return this.task }
}