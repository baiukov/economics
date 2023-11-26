import { ITask } from '../Itask.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'
import { TaskTest } from './taskTest.js'

export class Task2312 implements ITask {
	private taskNumber: number = 2312;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		let inflation, interest
		do {
			inflation = getRandomFloat(20, 0.1)
			interest = getRandomFloat(10, 0)
		} while (inflation == interest)

		const answers = [
			"Půjdeme do těchto investic",
			"Nepůjdeme do těchto investic"
		]

		const correctAnswer = interest - inflation > 0 ? 0 : 1

		this.taskString = `
		Roční termínovaný vklad byl v minulém roce úročen sazbou ${interest}%. Meziroční míra inflace byla ${inflation}%. Jak byste ohodnotil tuto situaci?
	`

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