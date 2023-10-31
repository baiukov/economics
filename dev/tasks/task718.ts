import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getLabourPrice } from '../utils/getLabourPrice.js'
import { getRandom } from '../utils/getRandom.js'
import { getTotalProductCurve } from '../utils/getTotalProductCurve.js'

export class Task718 implements ITask {
	private taskNumber = 718;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: number[]
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {
		//a
		let productPrice = this.getProductPrice()
		let productionK1: number, productionK2: number
		let marginalProductC: number, marginalProductK: number
		let labourPrice: number
		let labour: number
		let totalProduct: number
		do {
			[productionK1, productionK2] = getTotalProductCurve()
			labourPrice = getLabourPrice();
			[marginalProductC, marginalProductK] = [productionK1, productionK2 * 2]

			let [mrpC, mrpK] = [productionK1 * productPrice, marginalProductK * productPrice]
			labour = (mrpC - labourPrice) / -mrpK
			// labour = ((productionK1 * productPrice) - labourPrice) / (marginalProductK * productPrice)
			totalProduct = productionK1 * labour + (productionK2 * labour * labour)

		} while (labour % 1 != 0 || labour <= 0 || totalProduct <= 0)
		const totalProductString = `Q = ${productionK1}L - ${-productionK2}L<sup>2</sup>`

		//b

		//c

		//d
		const fixedCosts: number = this.getFixedCosts()
		const totalRevenue: number = totalProduct * productPrice
		const variableCosts: number = labourPrice * labour
		const totalCosts = variableCosts + fixedCosts

		const income: number = totalRevenue - totalCosts

		const task = `Práce je jedním variabilním výrobním faktorem. Produkční funkce firmy má tvar ${totalProductString}, kde L je množství spotřebovávané práce v hodinách za den. Všechny trhy jsou dokonale konkurenční. Výrobky se prodávají za cenu ${productPrice} Kč/ks a hodinová mzdová sazba je ${labourPrice} Kč. Firma maximalizuje zisk.`

		this.taskString = task
		this.answerHTML = this.createAnswerHTML(fixedCosts) as HTMLDivElement
		this.answers = [labour, totalProduct, totalRevenue, income]
	}

	public createAnswerHTML(fixedCosts: number) {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputAL = document.createElement('input')
		inputAL.setAttribute("type", "text")
		inputAL.setAttribute("id", `task-${this.taskNumber}-answer-aL`)
		const inputB = document.createElement('button')
		inputB.setAttribute("id", `task-${this.taskNumber}-answer-B`)
		inputB.innerHTML = "Show"
		const inputCTP = document.createElement('input')
		inputCTP.setAttribute("type", "text")
		inputCTP.setAttribute("id", `task-${this.taskNumber}-answer-cTP`)
		const inputCTR = document.createElement('input')
		inputCTR.setAttribute("type", "text")
		inputCTR.setAttribute("id", `task-${this.taskNumber}-answer-cTR`)
		const inputDZ = document.createElement('input')
		inputDZ.setAttribute("type", "text")
		inputDZ.setAttribute("id", `task-${this.taskNumber}-answer-dZ`)
		answerDiv.innerHTML = `
			a) Kolik hodin práce bude firma denně najímat?
			<br>L = ${inputAL.outerHTML}.
			<br>b) Graficky znázorněte vzniklou rovnováhu firmy ${inputB.outerHTML}.
			<br>c) Jaký objem produkce firma za den vyrobí a jaké budou její celkové příjmy 
			<br>Q = ${inputCTP.outerHTML}. TR = ${inputCTR.outerHTML}?
			<br>d) Jaký bude denní zisk firmy, jestliže její denní FC jsou ${fixedCosts} ,-Kč? <br>z = ${inputDZ.outerHTML}<br>
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
		const inputAL = document.getElementById(`task-${this.taskNumber}-answer-aL`) as HTMLInputElement
		const inputCTP = document.getElementById(`task-${this.taskNumber}-answer-cTP`) as HTMLInputElement
		const inputCTR = document.getElementById(`task-${this.taskNumber}-answer-cTR`) as HTMLInputElement
		const inputDZ = document.getElementById(`task-${this.taskNumber}-answer-dZ`) as HTMLInputElement
		const [answerAL, answerCTP, answerCTR, answerDZ] = this.answers
		inputAL.style.background = parseInt(inputAL.value) == answerAL ? Colors.green : Colors.red
		inputCTP.style.background = parseInt(inputCTP.value) == answerCTP ? Colors.green : Colors.red
		inputCTR.style.background = parseInt(inputCTR.value) == answerCTR ? Colors.green : Colors.red
		inputDZ.style.background = parseInt(inputDZ.value) == answerDZ ? Colors.green : Colors.red
	}

	private getProductPrice = () => {
		const productPrice = getRandom(1, 20)
		return productPrice
	}

	private getFixedCosts = () => {
		const fixedCosts: number = getRandom(100, 7000)
		return fixedCosts
	}

	public getTaskNumber() { return this.taskNumber }

	public getTaskString() { return this.taskString }

	public getTaskAnswer() { return this.answerHTML }

}