import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'


export class Task2612 implements ITask {
	private taskNumber = 2612;
	private taskHTML: HTMLDivElement | undefined
	private task: string | undefined
	private pageBuilder = PageBuilder.getPageBuilder()
	private answer: string[] = []

	public constructor() {
		const [amount1_2015, price1_2015] = this.getProduct()
		const [amount1_2016, price1_2016] = this.getProduct(amount1_2015, price1_2015)
		const [amount1_2017, price1_2017] = this.getProduct(amount1_2016, price1_2016)


		const [amount2_2015, price2_2015] = this.getProduct()
		const [amount2_2016, price2_2016] = this.getProduct(amount2_2015, price2_2015)
		const [amount2_2017, price2_2017] = this.getProduct(amount2_2016, price2_2016)

		const [amount3_2015, price3_2015] = this.getProduct()
		const [amount3_2016, price3_2016] = this.getProduct(amount3_2015, price3_2015)
		const [amount3_2017, price3_2017] = this.getProduct(amount3_2016, price3_2016)

		const nominalGDP2015 = amount1_2015 * price1_2015 + amount2_2015 * price2_2015 + amount3_2015 * price3_2015
		const realGDP2015 = nominalGDP2015

		const nominalGDP2016 = amount1_2016 * price1_2016 + amount2_2016 * price2_2016 + amount3_2016 * price3_2016
		const realGDP2016 = amount1_2016 * price1_2015 + amount2_2016 * price2_2015 + amount3_2016 * price3_2015

		const nominalGDP2017 = amount1_2017 * price1_2017 + amount2_2017 * price2_2017 + amount3_2017 * price3_2017
		const realGDP2017 = amount1_2017 * price1_2015 + amount2_2017 * price2_2015 + amount3_2017 * price3_2015

		const yNominal1 = (((nominalGDP2016 / nominalGDP2015) - 1) * 100).toFixed(2)
		const yNominal2 = (((nominalGDP2017 / nominalGDP2016) - 1) * 100).toFixed(2)

		const yReal1 = (((realGDP2016 / realGDP2015) - 1) * 100).toFixed(2)
		const yReal2 = (((realGDP2017 / realGDP2016) - 1) * 100).toFixed(2)

		const deflator2016 = (parseFloat(yNominal1) / parseFloat(yReal1)).toFixed(2)
		const deflator2017 = (parseFloat(yNominal2) / parseFloat(yReal2)).toFixed(2)

		this.answer = [yNominal1, yNominal2, yReal1, yReal2, deflator2016, deflator2017]

		this.task = `
			V následující tabulce jsou údaje o hypotetické ekonomice, která produkuje pouze tři druhy statků (X, Y, Z). V jednotlivých letech jsou zde uvedena vyprodukovaná množství statků a jejich ceny (Kč/ks). Základním obdobím je rok 2015 <br><br>

			<table>
				<tr>
					<td>Statek</td>
					<td class='nostyle-table'>
						<table class='table-gdp-elem-width'>
							<tr>
								<td class='table-gdp-year'>2015</td>
							</tr>
							<tr>
								<td class='amount-table-GDP'>množství</td>
								<td>cena</td>
							</tr>
						</table>
					</td>
					<td class='nostyle-table'>
						<table class='table-gdp-elem-width'>
							<tr>
								<td class='table-gdp-year'>2016</td>
							</tr>
							<tr>
								<td class='amount-table-GDP'>množství</td>
								<td>cena</td>
							</tr>
						</table>
					</td>
					<td class='nostyle-table'>
						<table class='table-gdp-elem-width'>
							<tr>
								<td class='table-gdp-year'>2017</td>
							</tr>
							<tr>
								<td class='amount-table-GDP'>množství</td>
								<td>cena</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
				<th>X</th>
				<td class='nostyle-table'> 
					<table class='table-gdp-elem-width'>
						<tr class='nostyle-table'>
							<td class='amount-table-GDP'> ${amount1_2015} </td>
							<td class='price-table-GDP'> ${price1_2015} </td>
						</tr>
					</table>
				</td>
				<td class='nostyle-table'> 
					<table class='table-gdp-elem-width'>
						<tr class='nostyle-table'>
							<td class='amount-table-GDP'> ${amount1_2016} </td>
							<td class='price-table-GDP'> ${price1_2016} </td>
						</tr>
					</table>
				</td>
				<td class='nostyle-table'> 
					<table class='table-gdp-elem-width'>
						<tr class='nostyle-table'>
							<td class='amount-table-GDP'> ${amount1_2017} </td>
							<td class='price-table-GDP'> ${price1_2017} </td>
						</tr>
					</table>
				</td>
			</tr>

			<tr>
					<th>Y</th>
					<td class='nostyle-table'> 
						<table class='table-gdp-elem-width'>
							<tr class='nostyle-table'>
								<td class='amount-table-GDP'> ${amount2_2015} </td>
								<td class='price-table-GDP'> ${price2_2015} </td>
							</tr>
						</table>
					</td>
					<td class='nostyle-table'> 
						<table class='table-gdp-elem-width'>
							<tr class='nostyle-table'>
								<td class='amount-table-GDP'> ${amount2_2016} </td>
								<td class='price-table-GDP'> ${price2_2016} </td>
							</tr>
						</table>
					</td>
					<td class='nostyle-table'> 
						<table class='table-gdp-elem-width'>
							<tr class='nostyle-table'>
								<td class='amount-table-GDP'> ${amount2_2017} </td>
								<td class='price-table-GDP'> ${price2_2017} </td>
							</tr>
						</table>
					</td>
				</tr>

				<tr>
				<th>Z</th>
				<td class='nostyle-table'> 
					<table class='table-gdp-elem-width'>
						<tr class='nostyle-table'>
							<td class='amount-table-GDP'> ${amount3_2015} </td>
							<td class='price-table-GDP'> ${price3_2015} </td>
						</tr>
					</table>
				</td>
				<td class='nostyle-table'> 
					<table class='table-gdp-elem-width'>
						<tr class='nostyle-table'>
							<td class='amount-table-GDP'> ${amount3_2016} </td>
							<td class='price-table-GDP'> ${price3_2016} </td>
						</tr>
					</table>
				</td>
				<td class='nostyle-table'> 
					<table class='table-gdp-elem-width'>
						<tr class='nostyle-table'>
							<td class='amount-table-GDP'> ${amount3_2017} </td>
							<td class='price-table-GDP'> ${price3_2017} </td>
						</tr>
					</table>
				</td>
			</tr>

			</table>	
		`
		this.taskHTML = this.createAnswerHTML() as HTMLDivElement
	}

	private getProduct(amount1 = 0, price1 = 0) {
		if (amount1) {
			const amount = Math.round(amount1 * getRandomFloat(1.15, 0.90))
			const price = Math.round(price1 * getRandomFloat(1.15, 0.90))
			return [amount, price]
		}

		const amount = getRandom(200, 2)
		const price = 100 - Math.floor(amount * 0.46)
		return [amount, price]
	}

	private createAnswerHTML = () => {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputdeflator2016 = document.createElement('input')
		inputdeflator2016.setAttribute("type", "text")
		inputdeflator2016.setAttribute("id", `task-${this.taskNumber}-answer-yDeflator2016`)
		const inputdeflator2017 = document.createElement('input')
		inputdeflator2017.setAttribute("type", "text")
		inputdeflator2017.setAttribute("id", `task-${this.taskNumber}-answer-yDeflator2017`)

		let [yNominal1, yNominal2, yReal1, yReal2, deflator2016, deflator2017] = this.answer
		answerDiv.innerHTML += `
		<table>
			<tr>
				<td>Yn</td>
				<td>${yNominal1}%</td>
				<td>${yNominal2}%</td>
			</tr>
			<tr>
				<td>Yr</td>
				<td>${yReal1}%</td>
				<td>${yReal2}%</td>
			</tr>
			<tr>
				<td>Deflator</td>
				<td>${inputdeflator2016.outerHTML}%</td>
				<td>${inputdeflator2017.outerHTML}%</td>
			</tr>
		</table>
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
		const inputdeflator2016 = document.getElementById(`task-${this.taskNumber}-answer-yDeflator2016`) as HTMLInputElement
		const inputdeflator2017 = document.getElementById(`task-${this.taskNumber}-answer-yDeflator2017`) as HTMLInputElement
		const [yNominal1, yNominal2, yReal1, yReal2, deflator2016, deflator2017] = this.answer as string[]
		inputdeflator2016.style.background = inputdeflator2016.value == deflator2016 ? Colors.green : Colors.red
		inputdeflator2017.style.background = inputdeflator2017.value == deflator2017 ? Colors.green : Colors.red
	}

	public getTaskNumber = () => { return this.taskNumber }
	public getTaskAnswer = () => { return this.taskHTML }
	public getTaskString = () => { return this.task }
}