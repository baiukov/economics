import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getDemandCurve } from '../utils/getDemandCurve.js'
import { getRandom } from '../utils/getRandom.js'

export class Task1006 implements ITask {
	private taskNumber = 1006;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: number[]
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {
		//a
		let optimalQ: number
		const [averageCostsK] = this.getAverageCostsCurve()
		let [marginalCostsK] = this.getMarginalCostsCurve()
		let demandC: number, demandK: number
		let pcQ: number, pcC: number

		do {
			[marginalCostsK] = this.getMarginalCostsCurve();
			[demandC, demandK] = getDemandCurve()
			optimalQ = demandC / -(demandK - averageCostsK)
			pcQ = (demandC / (-demandK + marginalCostsK))
		} while (optimalQ % 1 != 0 || pcQ % 1 != 0)
		pcC = demandC + demandK * pcQ
		const demandString: string = `P = ${demandC} - ${-demandK}Q`
		const averageCostsString: string = `AC = ${averageCostsK}Q`

		//b
		let maxIncomeQ: number
		let marginalRevenueC: number, marginalRevenueK: number
		let qInPerfectCompetition
		do {
			[marginalRevenueC, marginalRevenueK] = this.getMarginalRevenueCurve()
			maxIncomeQ = marginalRevenueC / (marginalCostsK - marginalRevenueK)
		} while (maxIncomeQ % 1 != 0 || maxIncomeQ > optimalQ || qInPerfectCompetition)
		const marginalRevenueString: string = `MR = ${marginalRevenueC} - ${-marginalRevenueK}Q`
		const marginalCostsString: string = `MC=${marginalCostsK}Q`

		const task = `Poptávka po produkci středně velké firmy lze vyjádřit funkcí: ${demandString}, mezní příjmy jsou ${marginalRevenueString}, průměrné náklady vyjadřuje funkce ${averageCostsString} mezní náklady ${marginalCostsString}`

		const optimalP = demandC + demandK * optimalQ
		const maxIncomeP = demandC + demandK * maxIncomeQ

		this.taskString = task
		this.answerHTML = this.createAnswerDiv() as HTMLDivElement
		this.answers = [optimalQ, optimalP, maxIncomeQ, maxIncomeP, pcQ, pcC]
	}

	public createAnswerDiv() {
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
		const inputCQ = document.createElement('input')
		inputCQ.setAttribute("type", "text")
		inputCQ.setAttribute("id", `task-${this.taskNumber}-answer-cQ`)
		const inputCP = document.createElement('input')
		inputCP.setAttribute("type", "text")
		inputCP.setAttribute("id", `task-${this.taskNumber}-answer-cP`)
		answerDiv.innerHTML = `
			a) Určete objem produkce a tržní cenu, při kterých bude firma realizovat pouze nirmální zisk.
			<br>Q = ${inputAQ.outerHTML}. P = ${inputAP.outerHTML} 
			<br>b) Určete objem produkce a tržní cenu v situaci maximalizace zisku 
			<br>Q = ${inputBQ.outerHTML}. P = ${inputBP.outerHTML}
			<br>c) Jaká by byla produkce a cena výrobků, kdyby byly prodávány na dokonale konkurenčním trhu?
			<br>Q = ${inputCQ.outerHTML}. P = ${inputCP.outerHTML}
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
		const inputCQ = document.getElementById(`task-${this.taskNumber}-answer-cQ`) as HTMLInputElement
		const inputCP = document.getElementById(`task-${this.taskNumber}-answer-cP`) as HTMLInputElement
		const [answerAQ, answerAP, answerBQ, answerBP, answerCQ, answerCP] = this.answers
		inputAQ.style.background = parseInt(inputAQ.value) == answerAQ ? Colors.green : Colors.red
		inputAP.style.background = parseInt(inputAP.value) == answerAP ? Colors.green : Colors.red
		inputBQ.style.background = parseInt(inputBQ.value) == answerBQ ? Colors.green : Colors.red
		inputBP.style.background = parseInt(inputBP.value) == answerBP ? Colors.green : Colors.red
		inputCQ.style.background = parseInt(inputCQ.value) == answerCQ ? Colors.green : Colors.red
		inputCP.style.background = parseInt(inputCP.value) == answerCP ? Colors.green : Colors.red
	}

	private getMarginalRevenueCurve = () => {
		const marginalRevenueC = getRandom(5, 40)
		const marginalRevenueK = getRandom(-10, -1)
		return [marginalRevenueC, marginalRevenueK]
	}

	private getAverageCostsCurve = () => {
		const averageCostsK: number = getRandom(1, 8)
		return [averageCostsK]
	}

	private getMarginalCostsCurve = () => {
		const marginalCostsK: number = getRandom(1, 10)
		return [marginalCostsK]
	}

	public getTaskNumber() { return this.taskNumber }

	public getTaskString() { return this.taskString }

	public getTaskAnswer() { return this.answerHTML }

}