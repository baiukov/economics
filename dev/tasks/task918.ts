import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'

export class Task918 implements ITask {
	private taskNumber = 918;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<number | string> = []
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {
		//a
		let marginalCostK: number
		let demandC: number, demandK: number
		let marginalRevenueC: number, marginalRevenueK: number
		let totalCostK: number, qMaxIncome: number, lernerIndex: number, priceMaxIncome: number, incomeMaxIncome: number
		let qMaxTurnOver: number, pMaxTurnOver: number, incomeMaxTurnOver: number
		let qZeroIncome, pZeroIncome, incomeZeroIncome
		let qPC, pPC, incomePC
		do {
			[demandC, demandK] = [getRandom(8, 60), getRandom(-5, -1)];
			[marginalRevenueC, marginalRevenueK] = this.getMarginalRevenueCurve()
			totalCostK = this.getTotalCost()
			marginalCostK = totalCostK * 2

			qMaxIncome = marginalRevenueC / (marginalCostK + -marginalRevenueK)
			priceMaxIncome = demandC + (demandK * qMaxIncome)
			const marginalCost = marginalCostK * qMaxIncome
			lernerIndex = (priceMaxIncome - marginalCost) / priceMaxIncome
			incomeMaxIncome = (qMaxIncome * priceMaxIncome) - totalCostK * (Math.pow(qMaxIncome, 2))

			qMaxTurnOver = marginalRevenueC / -marginalRevenueK
			pMaxTurnOver = demandC + (demandK * qMaxTurnOver)
			incomeMaxTurnOver = qMaxTurnOver * pMaxTurnOver - totalCostK * (Math.pow(qMaxTurnOver, 2))

			qZeroIncome = demandC / (totalCostK + -demandK)
			pZeroIncome = demandC + (demandK * qZeroIncome)
			incomeZeroIncome = qZeroIncome * pZeroIncome - totalCostK * (Math.pow(qZeroIncome, 2))

			qPC = demandC / (marginalCostK + -demandK)
			pPC = demandC + (demandK * qPC)

		} while (qMaxIncome % 1 != 0 || lernerIndex < 0 || priceMaxIncome <= 0 || qMaxTurnOver % 1 != 0 || pMaxTurnOver <= 0 || qZeroIncome % 1 != 0 || pZeroIncome <= 0 || qPC % 1 != 0 || pPC <= 0 || incomeZeroIncome != 0)

		this.taskString = `
		Poptávku po produkci monopolisty lze zapsat rovnicí: P (AR) = ${demandC} – ${-demandK}Q, mezní příjem 
		firmy MR = ${marginalRevenueC} – ${-marginalRevenueK}Q, nákladové podmínky výroby jsou následující: TC = ${totalCostK}Q<sup>2</sup>, MC = ${marginalCostK}Q. 
		`
		this.answerHTML = this.createAnswerDiv(0) as HTMLDivElement
		this.answers = [
			qMaxIncome, priceMaxIncome, incomeMaxIncome,
			lernerIndex.toFixed(2),
			qMaxTurnOver, pMaxTurnOver, incomeMaxTurnOver,
			qZeroIncome, pZeroIncome,
			qPC, pPC
		]
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
		const inputAIncome = document.createElement('input')
		inputAIncome.setAttribute("type", "text")
		inputAIncome.setAttribute("id", `task-${this.taskNumber}-answer-aIncome`)
		const inputB = document.createElement('input')
		inputB.setAttribute("type", "text")
		inputB.setAttribute("id", `task-${this.taskNumber}-answer-b`)
		const inputCQ = document.createElement('input')
		inputCQ.setAttribute("type", "text")
		inputCQ.setAttribute("id", `task-${this.taskNumber}-answer-cQ`)
		const inputCP = document.createElement('input')
		inputCP.setAttribute("type", "text")
		inputCP.setAttribute("id", `task-${this.taskNumber}-answer-cP`)
		const inputCIncome = document.createElement('input')
		inputCIncome.setAttribute("type", "text")
		inputCIncome.setAttribute("id", `task-${this.taskNumber}-answer-cIncome`)
		const inputDQ = document.createElement('input')
		inputDQ.setAttribute("type", "text")
		inputDQ.setAttribute("id", `task-${this.taskNumber}-answer-dQ`)
		const inputDP = document.createElement('input')
		inputDP.setAttribute("type", "text")
		inputDP.setAttribute("id", `task-${this.taskNumber}-answer-dP`)
		const inputEQ = document.createElement('input')
		inputEQ.setAttribute("type", "text")
		inputEQ.setAttribute("id", `task-${this.taskNumber}-answer-eQ`)
		const inputEP = document.createElement('input')
		inputEP.setAttribute("type", "text")
		inputEP.setAttribute("id", `task-${this.taskNumber}-answer-eP`)
		answerDiv.innerHTML = `
			a) Při jakém objemu produkce a při jaké ceně firma maximalizuje zisk ? Určete výši zisku. 
			<br>Q = ${inputAQ.outerHTML}. P = ${inputAP.outerHTML}. z = ${inputAIncome.outerHTML}
			<br>b) Vypočítejte hodnotu Lernerova indexu při objemu produkce v a). (zaokruhlte na setiny) 
			<br>L = ${inputB.outerHTML}
			<br>c) Při jakém objemu produkce a při jaké ceně firma maximalizuje obrat ? Určete výši zisku. 
			<br>Q = ${inputCQ.outerHTML}. P = ${inputCP.outerHTML}. z = ${inputCIncome.outerHTML}
			<br>d) V důsledku regulace je ekonomický zisk firmy nulový. Určete cenu a objem produkce. 
			<br>Q = ${inputDQ.outerHTML}. P = ${inputDP.outerHTML}
			<br>e) Při jakém objemu produkce a při jaké ceně bude firma alokačně efektivní? (tj. Při jakém objemu produkce a při jaké ceně nevzniknou náklady mrtvé váhy?)
			<br>Q = ${inputEQ.outerHTML}. P = ${inputEP.outerHTML}
			<br>f) Znázorněte graficky.
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
		const inputAIncome = document.getElementById(`task-${this.taskNumber}-answer-aIncome`) as HTMLInputElement
		const inputB = document.getElementById(`task-${this.taskNumber}-answer-b`) as HTMLInputElement
		const inputCQ = document.getElementById(`task-${this.taskNumber}-answer-cQ`) as HTMLInputElement
		const inputCP = document.getElementById(`task-${this.taskNumber}-answer-cP`) as HTMLInputElement
		const inputCIncome = document.getElementById(`task-${this.taskNumber}-answer-cIncome`) as HTMLInputElement
		const inputDQ = document.getElementById(`task-${this.taskNumber}-answer-dQ`) as HTMLInputElement
		const inputDP = document.getElementById(`task-${this.taskNumber}-answer-dP`) as HTMLInputElement
		const inputEQ = document.getElementById(`task-${this.taskNumber}-answer-eQ`) as HTMLInputElement
		const inputEP = document.getElementById(`task-${this.taskNumber}-answer-eP`) as HTMLInputElement
		const [
			answerAQ, answerAP, answerAIncome,
			answerB,
			answerCQ, answerCP, answerCIncome,
			answerDQ, answerDP,
			answerEQ, answerEP
		] = this.answers
		inputAQ.style.background = parseInt(inputAQ.value) == answerAQ ? Colors.green : Colors.red
		inputAP.style.background = parseFloat(inputAP.value) == answerAP ? Colors.green : Colors.red
		inputAIncome.style.background = parseFloat(inputAIncome.value) == answerAIncome ? Colors.green : Colors.red
		inputB.style.background = inputB.value == answerB ? Colors.green : Colors.red
		inputCQ.style.background = parseInt(inputCQ.value) == answerCQ ? Colors.green : Colors.red
		inputCP.style.background = parseFloat(inputCP.value) == answerCP ? Colors.green : Colors.red
		inputCIncome.style.background = parseFloat(inputCIncome.value) == answerCIncome ? Colors.green : Colors.red
		inputDQ.style.background = parseInt(inputDQ.value) == answerDQ ? Colors.green : Colors.red
		inputDP.style.background = parseFloat(inputDP.value) == answerDP ? Colors.green : Colors.red
		inputEQ.style.background = parseInt(inputEQ.value) == answerEQ ? Colors.green : Colors.red
		inputEP.style.background = parseFloat(inputEP.value) == answerEP ? Colors.green : Colors.red
	}

	private getMarginalRevenueCurve = () => {
		const marginalRevenueC = getRandom(10, 80)
		const marginalRevenueK = getRandomFloat(-5, -0.01)
		return [marginalRevenueC, marginalRevenueK]
	}

	private getTotalCost = () => {
		const totalCostK = getRandom(1, 7)
		return totalCostK
	}

	public getTaskNumber() { return this.taskNumber }

	public getTaskString() { return this.taskString }

	public getTaskAnswer() { return this.answerHTML }

}