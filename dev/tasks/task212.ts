import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { shuffle } from '../utils/shuffle.js'

export class Task212 implements ITask {
	private taskNumber = 212;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<any>
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {
		const options = [
			{
				id: null,
				name: "Neúroda chmele na Žatecku zvýší ceny sladovnického ječmene (chmel a ječmen jsou komplementy při výrobě piva)",
				isTrue: false
			},
			{
				id: null,
				name: "Neúroda chmele povede k poklesu poptávky po tuzemském pivu a k poklesu ceny tohoto piva",
				isTrue: false
			},
			{
				id: null,
				name: "Neúroda chmele způsobí, že stejné množství piva budou pivovary ochotny nabízet při vyšší ceně za láhev",
				isTrue: true
			},
			{
				id: null,
				name: "Růst DPH v restauračních službách sníží cenu skleněných půllitrů (skleněné půllitry jsou komplementy k točenému pivu) ",
				isTrue: true
			},
			{
				id: null,
				name: "Růst DPH v restauračních službách sníží cenu lahvových piv prodaných v supermarketu(točené a lahvové pivo jsou substituty)",
				isTrue: false
			},
			{
				id: null,
				name: "Móda dlouhých džínových sukní sníží cenu bavlny a zvýší ceny vzorovaných punčoch a vlněných sukní",
				isTrue: false
			},
			{
				id: null,
				name: "Obava z nemoci šílených krav sníží ceny vepřového masa a drůbežího masa",
				isTrue: false
			},
			{
				id: null,
				name: "Obava z nemoci šílených krav sníží cenu kravské kůže a kravských rohů (kůže a rohy jsou produkty, vznikající při výrobě hovězího masa) ",
				isTrue: false
			},
			{
				id: null,
				name: "Obava z ptačí chřipky zvýší cenu vepřového masa ",
				isTrue: true
			},
		]
		const currentOptions = shuffle(options)

		this.taskString = `
			Rozhodněte, zda níže uvedená tvrzení (za jinak stejných podmínek)jsou pravdivá (P) nebo
		nepravdivá (N).Znázorněte graficky.
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
			const answer = input.value.toUpperCase() === "P"
			input.style.background = input.value != "" && answer == currentOption.isTrue ? Colors.green : Colors.red
		}
	}

	public getTaskNumber() { return this.taskNumber }

	public getTaskString() { return this.taskString }

	public getTaskAnswer() { return this.answerHTML }

}