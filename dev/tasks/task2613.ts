import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'

export class Task2613 implements ITask {
	private taskNumber = 2613;
	private taskString: string | undefined
	private taskAnswer: HTMLElement | undefined
	private answers: string[] = []
	private pageBuilder = PageBuilder.getPageBuilder()

	constructor() {
		const food: Record<string, Record<string, number[]>> = {
			Jogurt: { cena: [20, 40], vaha: [5, 15] },
			Salám: { cena: [150, 300], vaha: [3, 10] },
			Čokoláda: { cena: [50, 120], vaha: [2, 8] },
			Brambory: { cena: [10, 30], vaha: [10, 25] },
			Brokolice: { cena: [40, 80], vaha: [5, 15] },
			Šunka: { cena: [200, 400], vaha: [8, 20] },
			Ryže: { cena: [20, 40], vaha: [15, 30] },
			Chléb: { cena: [30, 60], vaha: [10, 25] },
			Špagety: { cena: [15, 35], vaha: [5, 15] },
			Med: { cena: [80, 150], vaha: [2, 8] },
		}
		const year = getRandom(2020, 2000)

		let customerBasket: Record<string, Record<string, number[]>> = {}
		const foodNames = Object.keys(food)
		for (let i = 0; i < 3; i++) {
			const randomFoodName = foodNames[getRandom(foodNames.length - 1, 0)]
			if (customerBasket[randomFoodName]) i--
			customerBasket[randomFoodName] = food[randomFoodName]
		}

		let customberBasketStr = ""
		let cpi = 0
		let weights = 0
		Object.entries(customerBasket).forEach(([key, value]) => {
			const priceField = value.cena
			const weightField = value.vaha
			const weight = getRandom(weightField[1], weightField[0])
			const randomPrice1 = getRandom(priceField[1], priceField[0])
			const randomPrice2 = Math.floor(getRandomFloat(randomPrice1 * 1.3, randomPrice1 * 0.9))
			cpi += (randomPrice2 / randomPrice1) * (weight / 100)
			weights += weight
			customberBasketStr += `
				<tr>
					<td>${key}</td>
					<td>${weight}%</td>
					<td>${randomPrice1}Kč</td>
					<td>${randomPrice2}Kč</td>
				</tr>
			`
		})
		cpi = (cpi / weights) * 100
		const inflation = (cpi - 1) * 100


		this.taskString = `
			<table>
				<tr>
					<td>CPI</td>
					<td>Váha statku ve spotřebitelském koši</td>
					<td>${year - 1} ceny statků</td>
					<td>${year} ceny statků</td>
				</tr>
				${customberBasketStr}
			</table>
		`
		this.taskAnswer = this.createAnswerHTML()
		this.answers = [cpi.toFixed(2), inflation.toFixed(2)]
	}

	private createAnswerHTML = () => {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputCPI = document.createElement('input')
		inputCPI.setAttribute("type", "text")
		inputCPI.setAttribute("id", `task-${this.taskNumber}-answer-cpi`)
		const inputInflation = document.createElement('input')
		inputInflation.setAttribute("type", "text")
		inputInflation.setAttribute("id", `task-${this.taskNumber}-answer-inflation`)

		answerDiv.innerHTML += `
		<br>a) CPI = ${inputCPI.outerHTML}
		<br>b) Inflace = ${inputInflation.outerHTML}
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
		const inputCPI = document.getElementById(`task-${this.taskNumber}-answer-cpi`) as HTMLInputElement
		const inputInflation = document.getElementById(`task-${this.taskNumber}-answer-inflation`) as HTMLInputElement
		const [cpi, inflation] = this.answers
		inputCPI.style.background = inputCPI.value == cpi ? Colors.green : Colors.red
		inputInflation.style.background = inputInflation.value == inflation ? Colors.green : Colors.red
	}

	public getTaskNumber = () => { return this.taskNumber }
	public getTaskString = () => { return this.taskString }
	public getTaskAnswer = () => { return this.taskAnswer as HTMLDivElement }

}