import { ITask } from '../Itask'
import { PageBuilder } from '../pageBuilder.js'
import { alphabet } from '../utils/alphabet.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloatFixed1 } from '../utils/getRandomFloatFixed1.js'
import { shuffle } from '../utils/shuffle.js'

export class Task916 implements ITask {
	private taskNumber: number = 916;
	private answerHTML: HTMLDivElement | undefined
	private taskString: string | undefined
	private pageBuilder = PageBuilder.getPageBuilder()
	private answers: string[] = []

	public constructor() {
		const isOne = getRandom(0, 99) < 20
		const elasticity = isOne ? 1 : getRandom(0, 99) < 50 ? getRandomFloatFixed1(20, 1.1) : getRandomFloatFixed1(0.1, 0.9)

		this.taskString = `
		Ekonomický poradce najímaný jediným plastickým chirurgem, který provádí kosmetické 
		zákroky, tvrdí, že poptávková křivka po zákrocích je lineární. Pro běžný počet operací 
		vykonaných ročně je hodnota koeficientu cenové elasticity poptávky ${elasticity} (v absolutní 
		hodnotě). Předpokládejte, že jediným cílem chirurga je maximalizace zisku. Jak se má v 
		tomto případě zachovat ?
		<br>
		`

		const answers = [
			"musí chirurg zvýšit cenu za zákrok",
			"musí chirurg snížit cenu za zákrok",
			"musí chirurg ponechat cenu za zákrok"
		]
		const correctAnswer = isOne ? answers[2] : (elasticity > 1 ? answers[0] : answers[1])
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