import { ITask } from '../Itask.js'
import { PageBuilder } from '../pageBuilder.js'
import { Colors } from '../utils/colors.js'
import { getRandom } from '../utils/getRandom.js'
import { getZStr } from '../utils/getZStr.js'

export class Task508 implements ITask {
	private taskNumber = 508;
	private taskString: string | undefined
	private answerHTML: HTMLDivElement
	private answers: Array<number>
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();

	public constructor() {

		let productK1, productK2, productK3
		let marginalProductC, marginalProductK1, marginalProductK2
		let averageProductC, averageProductK1, averageProductK2
		let labour1, labour2
		let tpWithL1, mpWithL2
		let apStartDropL, apStartDropQ, mpMaxL, mpMaxQ
		let answers = []
		let isValid = true
		do {
			answers = []
			const additionalAnswers = []
			productK1 = getRandom(20, 1)
			do { productK2 = getRandom(10, -10) } while (productK2 === 0)
			do { productK3 = getRandom(15, -15) } while (productK1 === 0)
			additionalAnswers.push(productK1, productK2, productK3)


			marginalProductC = productK1
			marginalProductK1 = productK2 * 2
			marginalProductK2 = productK3 * 3
			additionalAnswers.push(marginalProductC, marginalProductK1, marginalProductK2)

			averageProductC = productK1
			averageProductK1 = productK2
			averageProductK2 = productK3
			additionalAnswers.push(averageProductC, averageProductK1, averageProductK2)

			labour1 = getRandom(5, 2)
			tpWithL1 = productK1 * labour1 + productK2 * Math.pow(labour1, 2) + productK3 * Math.pow(labour1, 3)
			answers.push(tpWithL1)

			labour2 = getRandom(5, 2)
			mpWithL2 = marginalProductC + marginalProductK1 * labour2 + marginalProductK2 * Math.pow(marginalProductK2, 2)
			answers.push(mpWithL2)


			apStartDropL = -(averageProductK1 - marginalProductK1) / (averageProductK2 - marginalProductK2)
			apStartDropQ = productK1 * apStartDropL + productK2 * Math.pow(apStartDropL, 2) + productK3 * Math.pow(apStartDropL, 3)
			answers.push(apStartDropL, apStartDropQ)

			const derivationMPK1 = marginalProductK1
			const derivationMPK2 = marginalProductK2 * 2


			mpMaxL = -derivationMPK1 / derivationMPK2
			mpMaxQ = productK1 * mpMaxL + productK2 * Math.pow(mpMaxL, 2) + productK3 * Math.pow(mpMaxL, 3)

			answers.push(mpMaxL, mpMaxQ)

			isValid = true
			answers.forEach((answer) => {
				isValid = isValid && answer % 1 === 0 && answer > 0
			})
			additionalAnswers.push(...answers)
			answers = additionalAnswers
		} while (!isValid)

		this.taskString = `
			Výrobní proces ve výrobní hale může být popsán následující produkční funkcí :
			Q = ${productK1}L ${getZStr(productK2)}L<sup>2</sup> ${getZStr(productK3)}L<sup>3</sup>, kde Q je množství plyšových krtků vyrobené během dne a L je počet dělníků zaměstnaných v hale. V hale jsou dvě montážní zařízení (tj. dvě jednotky fixního faktoru výroby). 
			`
		this.answerHTML = this.createAnswerDiv(labour1, labour2) as HTMLDivElement
		this.answers = answers
	}

	public createAnswerDiv(labour1: number, labour2: number) {
		const answerDiv = this.pageBuilder.createElement('div', {
			attributes: [{ attribute: "class", value: "answer-field" }]
		})
		const inputQ = document.createElement('input')
		inputQ.setAttribute("type", "text")
		inputQ.setAttribute("id", `task-${this.taskNumber}-answer-Q`)
		const inputAP = document.createElement('input')
		inputAP.setAttribute("type", "text")
		inputAP.setAttribute("id", `task-${this.taskNumber}-answer-AP`)
		const inputMP = document.createElement('input')
		inputMP.setAttribute("type", "text")
		inputMP.setAttribute("id", `task-${this.taskNumber}-answer-MP`)

		const inputB = document.createElement('input')
		inputB.setAttribute("type", "text")
		inputB.setAttribute("id", `task-${this.taskNumber}-answer-B`)

		const inputC = document.createElement('input')
		inputC.setAttribute("type", "text")
		inputC.setAttribute("id", `task-${this.taskNumber}-answer-C`)

		const inputDL = document.createElement('input')
		inputDL.setAttribute("type", "text")
		inputDL.setAttribute("id", `task-${this.taskNumber}-answer-DL`)
		const inputDQ = document.createElement('input')
		inputDQ.setAttribute("type", "text")
		inputDQ.setAttribute("id", `task-${this.taskNumber}-answer-DQ`)

		const inputEL = document.createElement('input')
		inputEL.setAttribute("type", "text")
		inputEL.setAttribute("id", `task-${this.taskNumber}-answer-EL`)
		const inputEQ = document.createElement('input')
		inputEQ.setAttribute("type", "text")
		inputEQ.setAttribute("id", `task-${this.taskNumber}-answer-EQ`)

		const inputFL = document.createElement('input')
		inputFL.setAttribute("type", "text")
		inputFL.setAttribute("id", `task-${this.taskNumber}-answer-FL`)


		answerDiv.innerHTML = `
			a) Charakterizujte TP, AP a MP. <br>
			TP = ${inputQ.outerHTML}<br>
			AP = ${inputAP.outerHTML}<br>
			MP = ${inputMP.outerHTML}<br>
			b) Určete TP, jestliže hala zaměstnává ${labour1} dělníky. <br>
			TP = ${inputB.outerHTML} <br>
			c) Určete MP, jestliže hala zaměstnává ${labour2} dělníky. <br>
			MP = ${inputC.outerHTML} <br>
			d) Určete množství práce a produkce, od kterého AP klesá. <br>
			L = ${inputDL.outerHTML} Q = ${inputDQ.outerHTML}<br>
			+e) Určete množství práce a produkce, při kterém bude MP práce maximální<br>
			L = ${inputEL.outerHTML} Q = ${inputEQ.outerHTML}<br>
			+f) Určete, od jakého bodu (počtu zaměstnaných dělníků) se začnou prosazovat klesající
			výnosy z variabilního vstupu<br>
			L = ${inputEL.outerHTML} <br>
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
		const [pK1, pK2, pK3, mpC, mpK1, mpK2, apC, apK1, apK2, tpB, cMP, dL, dQ, eL, eQ] = this.answers

		const Q = `${pK1}L ${getZStr(pK2)}L2 ${getZStr(pK3)}L3`
		const MP = `${mpC} ${getZStr(mpK1)}L ${getZStr(mpK2)}L2`
		const AP = `${apC} ${getZStr(apK1)}L ${getZStr(apK2)}L2`

		const inputQ = document.getElementById(`task-${this.taskNumber}-answer-Q`) as HTMLInputElement
		const inputMP = document.getElementById(`task-${this.taskNumber}-answer-MP`) as HTMLInputElement
		const inputAP = document.getElementById(`task-${this.taskNumber}-answer-AP`) as HTMLInputElement

		const inputB = document.getElementById(`task-${this.taskNumber}-answer-B`) as HTMLInputElement

		const inputC = document.getElementById(`task-${this.taskNumber}-answer-C`) as HTMLInputElement

		const inputDQ = document.getElementById(`task-${this.taskNumber}-answer-DQ`) as HTMLInputElement
		const inputDL = document.getElementById(`task-${this.taskNumber}-answer-DL`) as HTMLInputElement

		const inputEQ = document.getElementById(`task-${this.taskNumber}-answer-EQ`) as HTMLInputElement
		const inputEL = document.getElementById(`task-${this.taskNumber}-answer-EL`) as HTMLInputElement

		const inputFL = document.getElementById(`task-${this.taskNumber}-answer-FL`) as HTMLInputElement

		inputQ.style.background = inputQ.value === Q ? Colors.green : Colors.red
		inputMP.style.background = inputMP.value === MP ? Colors.green : Colors.red
		inputAP.style.background = inputAP.value === AP ? Colors.green : Colors.red
		inputB.style.background = inputB.value === tpB.toString() ? Colors.green : Colors.red
		inputC.style.background = inputC.value === cMP.toString() ? Colors.green : Colors.red
		inputDQ.style.background = inputDQ.value === dQ.toString() ? Colors.green : Colors.red
		inputDL.style.background = inputDL.value === dL.toString() ? Colors.green : Colors.red
		inputEQ.style.background = inputEQ.value === eQ.toString() ? Colors.green : Colors.red
		inputEL.style.background = inputEL.value === eL.toString() ? Colors.green : Colors.red
		inputFL.style.background = inputFL.value === eL.toString() ? Colors.green : Colors.red
	}

	public getTaskAnswer() { return this.answerHTML }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }
}