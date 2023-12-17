import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'
import { TaskTest } from './taskTest.js'

export class Task601 implements ITask {
	private taskNumber: number = 601;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {
		let quantity, fixedCosts, totalCosts, averageCosts
		do {
			quantity = getRandom(30, 5)
			fixedCosts = getRandom(150, 50)
			totalCosts = getRandom(1000, fixedCosts + 1)

			averageCosts = (totalCosts - fixedCosts) / quantity
		} while (averageCosts % 1 != 0 || averageCosts <= 0)

		this.taskString = `
			Jestliže ${quantity} jednotek zboží je produkováno při FC = ${fixedCosts} Kč a TC jsou ${totalCosts} Kč, pak
			AVC se rovnají : 
		`
		const answers = [
			`${averageCosts} Kč`,
			`${quantity} Kč`,
			`${averageCosts * getRandom(2, 4)} Kč`,
			`${Math.round(averageCosts * getRandomFloat(0.7, 0.3))} Kč`,
			`${averageCosts + getRandom(15, 5)} Kč`,
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