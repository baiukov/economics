import { ITask } from '../Itask.js'
import { costsMethodElements, incomeMethodElements } from '../configs/GDPutil.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { shuffle } from '../utils/shuffle.js'


export class Task2111 implements ITask {
	private taskNumber = 2111;
	private taskHTML: HTMLDivElement | undefined
	private task: string | undefined
	private pageBuilder = PageBuilder.getPageBuilder()
	private answer: string[] | undefined

	public constructor() {

		const [taskString, GDP, I, NDP, toFind] = this.getIncomeMetod()
		this.task = taskString as string
		this.answer = [GDP as string, I as string, NDP as string]
		console.log(this.answer)
		this.taskHTML = this.createAnswerHTML(toFind as string) as HTMLDivElement
		console.log(this.task, GDP)
	}

	private getIncomeMetod = () => {
		let elements: Array<Record<string, number | string>> = []
		let GDP: number = 0
		let elemToFind: number = 0
		let NDP: number = 0

		const salariesValue = getRandom(2000, 100)
		elements.push(
			{
				name: incomeMethodElements.salaries,
				value: salariesValue
			}
		)
		GDP += salariesValue

		const incomesValue = getRandom(500, 100)
		elements.push(
			{
				name: incomeMethodElements.incomes,
				value: incomesValue
			}
		)
		GDP += incomesValue

		const interestsValue = getRandom(300, 100)
		elements.push(
			{
				name: incomeMethodElements.interests,
				value: interestsValue
			}
		)
		GDP += interestsValue

		const rentsValue = getRandom(300, 100)
		elements.push(
			{
				name: incomeMethodElements.rents,
				value: rentsValue
			}
		)
		GDP += rentsValue

		const amortizationValue = getRandom(500, 100)
		elements.push(
			{
				name: incomeMethodElements.amortizations[
					getRandom(
						incomeMethodElements.amortizations.length - 1,
						0
					)
				],
				value: amortizationValue
			}
		)
		GDP += amortizationValue

		const isNetTaxes = getRandom(0, 99) < 50
		if (isNetTaxes) {
			const taxesValue = getRandom(500, 100)
			elements.push(
				{
					name: incomeMethodElements.taxes.netTaxes,
					value: taxesValue
				}
			)
			GDP += taxesValue
		} else {
			const taxesValue = getRandom(500, 100)
			const subvence = getRandom(taxesValue, 99)
			const transfers = incomeMethodElements.taxes.grossTaxes.transfers
			elements.push(
				{
					name: incomeMethodElements.taxes.grossTaxes.name,
					value: taxesValue
				},
				{
					name: transfers[getRandom(transfers.length - 1, 0)],
					value: subvence
				}
			)
			GDP += (taxesValue - subvence)
		}

		let GDPCostMethod: number = 0
		let additionalElements = []
		const costsElements: string[] = [
			costsMethodElements.costs,
			costsMethodElements.government,
			costsMethodElements.investments.gross,
			costsMethodElements.netExport.netExport,
		]
		const indexToFind = getRandom(costsElements.length - 1, 0)
		let another = []
		for (let i = 0; i < costsElements.length; i++) {
			if (i != indexToFind) another.push(costsElements[i])
		}
		do {
			additionalElements = []
			GDPCostMethod = 0

			for (let i = 0; i < another.length; i++) {
				const value = getRandom(100, 2000)
				additionalElements.push(
					{
						name: another[i],
						value: value
					}
				)
				GDPCostMethod += value
			}
		} while (GDP < GDPCostMethod)
		elements.push(...additionalElements)

		elemToFind = GDP - GDPCostMethod
		NDP = GDP - amortizationValue
		let taskString = "V dané ekonomice jsou známé následující údaje (v mil. Kč)<br><br>"
		elements = shuffle(elements)
		let taskStringPart = ""
		elements.forEach((element) => {
			taskStringPart += `${element.name} ${element.value}, `
		})
		taskStringPart = taskStringPart[0].toUpperCase() + taskStringPart.slice(1, -2) + "."
		taskString += taskStringPart
		return [taskString, GDP, elemToFind, NDP, costsElements[indexToFind]]
	}

	private createAnswerHTML = (toFind: string) => {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputGDP = document.createElement('input')
		inputGDP.setAttribute("type", "text")
		inputGDP.setAttribute("id", `task-${this.taskNumber}-answer-GDP`)
		const inputNDP = document.createElement('input')
		inputNDP.setAttribute("type", "text")
		inputNDP.setAttribute("id", `task-${this.taskNumber}-answer-NDP`)
		const inputI = document.createElement('input')
		inputI.setAttribute("type", "text")
		inputI.setAttribute("id", `task-${this.taskNumber}-answer-I`)

		answerDiv.innerHTML += `
			a) HDP = ${inputGDP.outerHTML} <br>
			b) ${toFind} ${inputI.outerHTML} <br>
			c) ČDP = ${inputNDP.outerHTML} <br>
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
		const inputGDP = document.getElementById(`task-${this.taskNumber}-answer-GDP`) as HTMLInputElement
		const inputI = document.getElementById(`task-${this.taskNumber}-answer-I`) as HTMLInputElement
		const inputNDP = document.getElementById(`task-${this.taskNumber}-answer-NDP`) as HTMLInputElement
		const [GDP, I, NDP] = this.answer as string[]
		inputGDP.style.background = inputGDP.value == GDP ? Colors.green : Colors.red
		inputI.style.background = inputI.value == I ? Colors.green : Colors.red
		inputNDP.style.background = inputNDP.value == NDP ? Colors.green : Colors.red
	}

	public getTaskNumber = () => { return this.taskNumber }
	public getTaskAnswer = () => { return this.taskHTML }
	public getTaskString = () => { return this.task }
}