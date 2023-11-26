import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloatFixed1 } from '../utils/getRandomFloatFixed1.js'

export class Task2211 implements ITask {
	private taskNumber = 2211;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined
	private pageBuilder = PageBuilder.getPageBuilder()
	private answers: number[]

	public constructor() {
		let autonomicCost, disposableCostsC, grossPlannedInvestice
		let GDP, totalCosts, totalSaves
		let additionalInvestments, marginalC
		let deltaGDP, newGDP
		do {
			[autonomicCost, disposableCostsC] = this.getCostsCurve()
			grossPlannedInvestice = this.getPlannedInvestice()
			GDP = (autonomicCost + grossPlannedInvestice) / (1 - disposableCostsC)

			totalCosts = autonomicCost + disposableCostsC * GDP

			totalSaves = -autonomicCost + (1 - disposableCostsC) * GDP

			additionalInvestments = this.getPlannedInvestice()
			marginalC = this.getCostsCurve()[1]

			deltaGDP = Math.round((1 / (1 - marginalC)) * additionalInvestments)
			newGDP = GDP + deltaGDP
		}
		while (GDP % 1 != 0 || GDP <= 0 || newGDP % 1 != 0)

		console.log(deltaGDP, newGDP)

		this.taskString = `
		Dvousektorová ekonomika je charakterizována spotřební fuknci C = ${autonomicCost} + ${disposableCostsC}Y<sub>D</sub> a hrubými planovanými investicemi ${grossPlannedInvestice}. Zjistěte
		`
		this.taskAnswer = this.createAnswerDiv(additionalInvestments, marginalC) as HTMLDivElement
		this.answers = [GDP, totalCosts, totalSaves, deltaGDP, newGDP]
	}

	public createAnswerDiv(additionalInvestments: number, marginalC: number) {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputA = document.createElement('input')
		inputA.setAttribute("type", "text")
		inputA.setAttribute("id", `task-${this.taskNumber}-answer-a`)
		const inputB = document.createElement('input')
		inputB.setAttribute("type", "text")
		inputB.setAttribute("id", `task-${this.taskNumber}-answer-b`)
		const inputC = document.createElement('input')
		inputC.setAttribute("type", "text")
		inputC.setAttribute("id", `task-${this.taskNumber}-answer-c`)
		const inputDdY = document.createElement('input')
		inputDdY.setAttribute("type", "text")
		inputDdY.setAttribute("id", `task-${this.taskNumber}-answer-ddY`)
		const inputDY = document.createElement('input')
		inputDY.setAttribute("type", "text")
		inputDY.setAttribute("id", `task-${this.taskNumber}-answer-dY`)
		answerDiv.innerHTML = `
			a) Výši rovnovážného HDP
			<br>HDP = ${inputA.outerHTML}
			<br>b) Výši spotřeby na úrovni rovnovážného produktu
			<br>C = ${inputB.outerHTML}
			<br>c) Velikost úspor
			<br>S = ${inputC.outerHTML}
			<br>d) Vypočtěte a zakreslete do grafu změnu rovnovážného důchodu (produktu), když se zvýší investice o ${additionalInvestments} mil. Kč a dále víme, že v dáne dvousektorové ekonomice lze popsat spotřební chování domácností mezním sklonem ke spotřebě, kde c = ${marginalC}. Zaohruhlte nahoru.
			<br>ΔY = ${inputDdY.outerHTML}. HDP = ${inputDY.outerHTML}<br>
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
		const inputA = document.getElementById(`task-${this.taskNumber}-answer-a`) as HTMLInputElement
		const inputB = document.getElementById(`task-${this.taskNumber}-answer-b`) as HTMLInputElement
		const inputC = document.getElementById(`task-${this.taskNumber}-answer-c`) as HTMLInputElement
		const inputDdY = document.getElementById(`task-${this.taskNumber}-answer-ddY`) as HTMLInputElement
		const inputDY = document.getElementById(`task-${this.taskNumber}-answer-dY`) as HTMLInputElement
		const [
			answerA, answerB, answerC, answerDdY, answerDY
		] = this.answers
		inputA.style.background = parseInt(inputA.value) == answerA ? Colors.green : Colors.red
		inputB.style.background = parseFloat(inputB.value) == answerB ? Colors.green : Colors.red
		inputC.style.background = parseFloat(inputC.value) == answerC ? Colors.green : Colors.red
		inputDdY.style.background = parseFloat(inputDdY.value) == answerDdY ? Colors.green : Colors.red
		inputDY.style.background = parseFloat(inputDY.value) == answerDY ? Colors.green : Colors.red
	}

	private getCostsCurve = () => {
		const autonomicCost = getRandom(100, 1000)
		const disposableCostsC = getRandomFloatFixed1(1.0, 0.1)
		return [autonomicCost, disposableCostsC]
	}

	private getPlannedInvestice = () => {
		return getRandom(100, 1000)
	}

	private additionalInvestice = () => {
		return getRandom(1, 99)
	}

	public getTaskAnswer() { return this.taskAnswer }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }


}