import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'

export class Task912 implements ITask {
	private taskNumber = 912;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: number[] = []
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {
		//a
		let q: number
		let qPC: number
		let marginalCost: number
		let demandC: number, demandK: number
		let marginalRevenueC: number, marginalRevenueK: number
		do {
			marginalCost = getRandom(1, 10);
			[demandC, demandK] = [getRandom(5, 500), getRandomFloat(-0.01, -0.1)];
			[marginalRevenueC, marginalRevenueK] = this.getMarginalRevenueCurve()
			q = (marginalRevenueC - marginalCost) / -marginalRevenueK
			qPC = (demandC - marginalCost) / -demandK
		} while (q % 1 != 0 || q <= 0 || qPC % 1 != 0 || qPC <= 0 || q > qPC)
		const price = demandC + (demandK * q)

		this.taskString = `
		Poptávková křivka po produkci monopolního výrobce ručních mixérů v daném měsíci je 
		dána následující rovnicí : P = ${demandC} – ${-demandK}Q, mezní příjem výrobce lze popsat rovnicí: MR = 
		${marginalRevenueC} – ${-marginalRevenueK}Q.`
		this.answerHTML = this.createAnswerDiv(marginalCost) as HTMLDivElement
		this.answers = [q, price, qPC, marginalCost]
	}

	public createAnswerDiv(marginalCost: number) {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputAQ = document.createElement('input')
		inputAQ.setAttribute("type", "text")
		inputAQ.setAttribute("id", `task-${this.taskNumber}-answer-aQ`)
		const inputAP = document.createElement('input')
		inputAP.setAttribute("type", "text")
		inputAP.setAttribute("id", `task-${this.taskNumber}-answer-aP`)
		const inputBQ = document.createElement('input')
		inputBQ.setAttribute("type", "text")
		inputBQ.setAttribute("id", `task-${this.taskNumber}-answer-bQ`)
		const inputBP = document.createElement('input')
		inputBP.setAttribute("type", "text")
		inputBP.setAttribute("id", `task-${this.taskNumber}-answer-bP`)
		answerDiv.innerHTML = `
			a) Jestliže MC výroby ručních mixérů jsou konstantní a rovny ${marginalCost} EUR, kolik 
			mixérů vyrobí výrobce maximalizující zisk za měsíc a za jakou cenu je prodá?
			<br>Q = ${inputAQ.outerHTML}. P = ${inputAP.outerHTML} 
			<br>b) Jaká by byla 
			produkce a cena mixérů, kdyby byly prodávány na dokonale konkurenčním trhu?
			<br>Q = ${inputBQ.outerHTML}. P = ${inputBP.outerHTML}
			<br>c) Znázorněte graficky.
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
		const inputAQ = document.getElementById(`task-${this.taskNumber}-answer-aQ`) as HTMLInputElement
		const inputAP = document.getElementById(`task-${this.taskNumber}-answer-aP`) as HTMLInputElement
		const inputBQ = document.getElementById(`task-${this.taskNumber}-answer-bQ`) as HTMLInputElement
		const inputBP = document.getElementById(`task-${this.taskNumber}-answer-bP`) as HTMLInputElement
		const [answerAQ, answerAP, answerBQ, answerBP] = this.answers
		inputAQ.style.background = parseInt(inputAQ.value) == answerAQ ? Colors.green : Colors.red
		inputAP.style.background = parseFloat(inputAP.value) == answerAP ? Colors.green : Colors.red
		inputBQ.style.background = parseInt(inputBQ.value) == answerBQ ? Colors.green : Colors.red
		inputBP.style.background = parseInt(inputBP.value) == answerBP ? Colors.green : Colors.red
	}

	private getMarginalRevenueCurve = () => {
		const marginalRevenueC = getRandom(50, 150)
		const marginalRevenueK = getRandomFloat(-0.3, -0.01)
		return [marginalRevenueC, marginalRevenueK]
	}

	public getTaskNumber() { return this.taskNumber }

	public getTaskString() { return this.taskString }

	public getTaskAnswer() { return this.answerHTML }

}