import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { alphabet } from '../utils/alphabet.js'
import { Colors } from '../utils/colors.js'
import { shuffle } from '../utils/shuffle.js'

export class TaskTest implements ITask {
	private taskNumber = 0;
	private taskHTML: HTMLDivElement | undefined
	private task: string | undefined
	private pageBuilder = PageBuilder.getPageBuilder()
	private answer: string | undefined

	public constructor(number: number, task: string, answers: string[], correctAnswerIndex: number) {
		this.taskNumber = number
		this.task = task
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