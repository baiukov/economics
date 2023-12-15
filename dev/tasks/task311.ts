import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { shuffle } from '../utils/shuffle.js'

export class Task311 implements ITask {
	private taskNumber = 311;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<any>
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {
		const options = [
			{
				id: null,
				name: "Denně vypiji čtyři šálky kávy bez ohledu na její cenu",
				answer: "DNE"
			},
			{
				id: null,
				name: "Každý měsíc utratím za kávu právě 200 Kč, i když se cena kávy mění",
				answer: "JE"
			},
			{
				id: null,
				name: "Pokud cena kávy klesne o 2 %, zvýším nakupované množství právě o 2 %",
				answer: "JE"
			},
			{
				id: null,
				name: "V důsledku neúrody se cena kávy zvýšila o 10 % a tržby z prodeje kávy vzrostly také o 10 %.",
				answer: "NE"
			},
			{
				id: null,
				name: "V důsledku neúrody se cena kávy zvýšila o 5 % a prodané množství kleslo o 6 %",
				answer: "E"
			},
			{
				id: null,
				name: "Při ceně 10 Kč za šálek kávy koupím jakékoliv množství, maximálně však 10 šálků. ",
				answer: "DE"
			},
			{
				id: null,
				name: "V důsledku neúrody kávy se její cena zvýšila o 5 % a tržby z prodeje klesly o 2 %. ",
				answer: "E"
			}
		]
		const currentOptions = shuffle(options)

		this.taskString = `
		Určete, jestli je poptávka v popsaných případech dokonale elastická (DE), elastická (E), 
		jednotkově elastická (JE), neelastická (NE), dokonale neelastická (DNE).
		`
		this.answers = currentOptions
		this.answerHTML = this.createAnswerDiv() as HTMLDivElement
	}

	public createAnswerDiv() {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const charCodeOfA = "a".charCodeAt(0)
		for (let i = 0; i < this.answers.length; i++) {
			const currentLetter = String.fromCharCode((charCodeOfA + i))
			const input = document.createElement('input')
			input.setAttribute("type", "text")
			input.setAttribute("id", `task-${this.taskNumber}-answer-${currentLetter}`)

			const currentOption = this.answers[i]
			const optionStr = `<br>${currentLetter}) ${currentOption.name} ${input.outerHTML}`
			answerDiv.innerHTML += optionStr
			this.answers[i].id = currentLetter
		}
		answerDiv.innerHTML += "<br>"

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
		for (let i = 0; i < this.answers.length; i++) {
			const currentOption = this.answers[i]
			const input = document.getElementById(`task-${this.taskNumber}-answer-${currentOption.id}`) as HTMLInputElement
			if (!input) continue
			const answer = input.value.toUpperCase()
			input.style.background = answer == currentOption.answer ? Colors.green : Colors.red
		}
	}

	public getTaskNumber() { return this.taskNumber }

	public getTaskString() { return this.taskString }

	public getTaskAnswer() { return this.answerHTML }

}