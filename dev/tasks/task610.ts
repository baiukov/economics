import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { TaskTest } from './taskTest.js'

export class Task610 implements ITask {
	private taskNumber: number = 610;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {
		let quantity, fixedCosts, averageCosts
		quantity = getRandom(30, 5)
		fixedCosts = getRandom(150, 50)
		averageCosts = getRandom(20, 2)

		this.taskString = `
		Jestliže fixní náklady jsou ${fixedCosts} Kč, AVC pak ${averageCosts} Kč při produkci ${quantity} kusů, MC na
		výrobu ${quantity + 1}-é jednotky budou: 
		`
		const answers = ["nelze přesně určit"]
		for (let i = 0; i < 4; i++) {
			answers.push(`${getRandom(30, 1)} Kč`)
		}
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