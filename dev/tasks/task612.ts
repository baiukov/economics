import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getZStr } from '../utils/getZStr.js'

export class Task612 implements ITask {
	private taskNumber = 612;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<number | string>
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {
		let totalCostC, totalCostK1, totalCostK2, totalCostK3
		let marginalCostC, marginalCostK1, marginalCostK2
		let fixedCosts
		let qB1, qB2, afcB1, afcB2
		let qC1, qC2, avcC1, avcC2
		let qD1, qD2, mcD1, mcD2
		let acK1, acC, acK2, acK3, qE1, qE2, acE1, acE2
		let isValid
		do {
			isValid = true
			const check = (value: number) => {
				return value % 1 === 0 && value > 0
			}

			totalCostC = getRandom(2000, 100)
			do { totalCostK1 = getRandom(15, -15) } while (totalCostK1 === 0)
			do { totalCostK2 = getRandom(10, -10) } while (totalCostK3 === 0)
			do { totalCostK3 = getRandom(5, -5) } while (totalCostK3 === 0)

			marginalCostC = totalCostK1
			marginalCostK1 = totalCostK2 * 2
			marginalCostK2 = totalCostK3 * 3

			// a
			fixedCosts = totalCostC

			//b
			qB1 = getRandom(15, 1)
			qB2 = getRandom(25, qB1 + 1)
			afcB1 = fixedCosts / qB1
			afcB2 = fixedCosts / qB2
			isValid = isValid && check(afcB1)
			isValid = isValid && check(afcB2)

			// c
			qC1 = getRandom(15, 1)
			qC2 = getRandom(25, qC1 + 1)
			const avcC = totalCostK1
			const avcK1 = totalCostK2
			const avcK2 = totalCostK3

			avcC1 = avcC + avcK1 * qC1 + avcK2 * Math.pow(qC1, 2)
			avcC2 = avcC + avcK1 * qC2 + avcK2 * Math.pow(qC2, 2)
			isValid = isValid && check(avcC1)
			isValid = isValid && check(avcC2)

			//d
			qD1 = getRandom(15, 1)
			qD2 = getRandom(25, qD1 + 1)
			mcD1 = marginalCostC + marginalCostK1 * qD1 + marginalCostK2 * Math.pow(qD1, 2)
			mcD2 = marginalCostC + marginalCostK1 * qD2 + marginalCostK2 * Math.pow(qD2, 2)
			isValid = isValid && check(mcD1)
			isValid = isValid && check(mcD2)

			// e
			acK1 = totalCostC
			acC = totalCostK1
			acK2 = totalCostK2
			acK3 = totalCostK3

			qE1 = getRandom(15, 1)
			qE2 = getRandom(25, qE1 + 1)

			acE1 = acK1 / qE1 + acC + acK2 * qE1 + acK3 * Math.pow(qE1, 2)
			acE2 = acK1 / qE2 + acC + acK2 * qE2 + acK3 * Math.pow(qE2, 2)
			isValid = isValid && check(acE1)
			isValid = isValid && check(acE2)
		} while (!isValid)


		this.taskString = `
			Předpokládejme, že známe krátkodobou funkci celkových nákladů továrny vyrábějící
			horská kola. STC = ${fixedCosts} ${getZStr(totalCostK1)}Q ${getZStr(totalCostK2)}Q<sup>2</sup> ${getZStr(totalCostK3)}Q<sup>3<sup>
		`
		this.answerHTML = this.createAnswerDiv([getRandom(15, 1), getRandom(15, 1), qB1, qB2, qC1, qC2, qD1, qD2, qE1, qE2]) as HTMLDivElement
		this.answers = [fixedCosts, fixedCosts, afcB1, afcB2, avcC1, avcC2, mcD1, mcD2, acE1, acE2]
	}

	public createAnswerDiv(quantities: number[]) {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})

		const inputs = []
		for (let i = 0; i < quantities.length; i++) {
			const input = document.createElement('input')
			input.setAttribute("type", "text")
			input.setAttribute("id", `task-${this.taskNumber}-answer-${i}`)
			inputs.push(input)
		}

		answerDiv.innerHTML = `
			a) Jak velké jsou fixní náklady (FC) při výrobě ${quantities[0]} jízdních kol ${inputs[0].outerHTML}, ${quantities[1]} jízdních kol ${inputs[1].outerHTML}? <br>
			b) Určete velikost AFC při výrobě ${quantities[2]} ${inputs[2].outerHTML} a ${quantities[3]} ${inputs[3].outerHTML} jízdních kol.<br>
			c) Jak velké by byly AVC při výrobě ${quantities[4]} ${inputs[4].outerHTML} (${quantities[5]} ${inputs[5].outerHTML}) jízdních kol?<br>
			d) Jak velké by byly MC při výrobě ${quantities[6]} ${inputs[6].outerHTML} (${quantities[7]} ${inputs[7].outerHTML}) jízdních kol?<br>
			e) Jak velké jsou AC při výrobě ${quantities[8]} ${inputs[8].outerHTML} (${quantities[9]} ${inputs[9].outerHTML}) jízdních kol?<br>
			Zakreslete (obecně) průběh nákladových křivek a popište na křivce VC a MC vývoj výnosů
			z variabilního vstupu.<br>
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
		for (let i = 0; i < this.answers.length; i++) {
			const input = document.getElementById(`task-${this.taskNumber}-answer-${i}`) as HTMLInputElement
			input.style.background = input.value === this.answers[i].toString() ? Colors.green : Colors.red
		}
	}


	public getTaskNumber() { return this.taskNumber }

	public getTaskString() { return this.taskString }

	public getTaskAnswer() { return this.answerHTML }

}