import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'

export class Task2213 implements ITask {
	private taskNumber = 2213;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined
	private answers: number[] = []
	private pageBuilder = PageBuilder.getPageBuilder()

	public constructor() {
		const isMPC = getRandom(0, 99) < 40
		let t, c, s, Ca, TR, Ip, G, TA, multiplicator, balancedGDP, Yd, C
		do {
			t = getRandom(20, 2) / 100
			const mp = parseFloat(getRandomFloat(0.1, 0.7).toFixed(1))
			c = isMPC ? mp : 1 - mp
			s = isMPC ? 1 - mp : mp
			Ca = getRandom(1000, 300)
			TR = getRandom(1000, 100)
			Ip = getRandom(1000, 100)
			G = getRandom(1000, 100)
			TA = getRandom(Ca - 100, 100)

			multiplicator = parseFloat((1 / (1 - c * (1 - t))).toFixed(2))
			balancedGDP = (Ca + c * (TR - TA) + Ip + G) * multiplicator
			Yd = balancedGDP + TR - TA - t * balancedGDP
			C = Ca + c * Yd

		} while (balancedGDP * 10 % 1 != 0 || Yd * 10 % 1 != 0 || C * 10 % 1 != 0)

		this.taskString = `
			Třísektorová ekonomika je charakterizována následovně: sazba důchodové daně ${t * 100}%, mezní sklon k${isMPC ? "e spotřebě" : " úsporám"} ${isMPC ? c : s}, autonomní spotřeba domacností ${Ca}, transfery ${TR}, plánované investice ${Ip}, vládní investice ${G}, autonomní daně ${TA}. Určete:
		`
		console.log(multiplicator, balancedGDP, Yd, C)

		this.answers = [multiplicator, balancedGDP, Yd, C]
		this.taskAnswer = this.createAnswerHTML() as HTMLDivElement
	}

	private createAnswerHTML = () => {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputdY = document.createElement('input')
		inputdY.setAttribute("type", "text")
		inputdY.setAttribute("id", `task-${this.taskNumber}-answer-dY`)
		const inputY = document.createElement('input')
		inputY.setAttribute("type", "text")
		inputY.setAttribute("id", `task-${this.taskNumber}-answer-Y`)
		const inputYD = document.createElement('input')
		inputYD.setAttribute("type", "text")
		inputYD.setAttribute("id", `task-${this.taskNumber}-answer-YD`)
		const inputC = document.createElement('input')
		inputC.setAttribute("type", "text")
		inputC.setAttribute("id", `task-${this.taskNumber}-answer-C`)

		answerDiv.innerHTML += `
		a) Výši výdajového multiplikátoru ${inputdY.outerHTML} <br>
		b) Výši rovnovážného HDP ${inputY.outerHTML}<br>
		c) Výši disponibilního důchodu ${inputYD.outerHTML}<br>
		d) Výši celkové spotřeby domácností ${inputC.outerHTML}<br>
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
		const inputY = document.getElementById(`task-${this.taskNumber}-answer-Y`) as HTMLInputElement
		const inputYD = document.getElementById(`task-${this.taskNumber}-answer-YD`) as HTMLInputElement
		const inputC = document.getElementById(`task-${this.taskNumber}-answer-C`) as HTMLInputElement
		const [dY, Y, YD, C] = this.answers
		inputdY.style.background = inputdY.value == dY.toFixed(2) ? Colors.green : Colors.red
		inputY.style.background = inputY.value == Y.toString() ? Colors.green : Colors.red
		inputYD.style.background = inputYD.value == YD.toString() ? Colors.green : Colors.red
		inputC.style.background = inputC.value == C.toString() ? Colors.green : Colors.red
	}


	public getTaskAnswer() { return this.taskAnswer }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }

}