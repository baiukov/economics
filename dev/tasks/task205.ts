import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'
import { TaskTest } from './taskTest.js'

export class Task205 implements ITask {
	private taskNumber: number = 205;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		let demandC, demandK, supplyC, supplyK, quantity, price
		do {
			demandC = getRandom(10, 100)
			demandK = getRandom(-15, 15)
			supplyC = getRandom(10, 100)
			supplyK = getRandom(-15, 15)

			quantity = (demandC - supplyC) / (supplyK - demandK)
			price = demandC + demandK * quantity
		} while (quantity % 1 != 0 || quantity <= 0 || price <= 0)

		const isDkNegative = demandK < 0
		const isSkNegative = supplyK < 0
		this.taskString = `
			Poptávka je určena rovnicí P = ${demandC} ${isDkNegative ? ("- " + -demandK) : ("+ " + demandK)}Q a nabídka je určna rovnicí P = ${supplyC} ${isSkNegative ? ("- " + -supplyK) : ("+ " + supplyK)}Q. Rovnovázná cena a množství jsou
		`
		const answers = [
			`P = ${price} Q = ${quantity}`,
			`P = ${price + getRandom(1, 10)} Q = ${Math.round(quantity * getRandomFloat(0.7, 0.3))}`,
			`P = ${Math.round(price * getRandomFloat(0.7, 0.3))} Q = ${quantity + getRandom(1, 10)}`,
			`P = ${Math.round(price * getRandomFloat(0.7, 0.3))} Q = ${quantity + getRandom(1, 10)}`,
			`P = ${price + getRandom(1, 10)} Q = ${quantity}`
		]
		const correctAnswer = 0

		const test = new TaskTest
			(
				this.taskNumber,
				this.taskString,
				answers,
				correctAnswer
			)
		this.taskAnswer = test.getTaskAnswer()
	}

	public getTaskAnswer() { return this.taskAnswer }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }
}