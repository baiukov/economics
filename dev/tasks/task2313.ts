import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { TaskTest } from './taskTest.js'

export class Task2313 implements ITask {
	private taskNumber: number = 2313;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		const isUp = getRandom(0, 99) < 60

		let r1, r2, p1, p2, deltaRate1, deltaRate2, isLocalUp
		do {
			p1 = getRandom(10, 1)
			r1 = getRandom(12, p1 + 1)

			p2 = getRandom(10, 1)
			r2 = getRandom(12, p2 + 1)

			deltaRate1 = r1 - p1
			deltaRate2 = r2 - p2
			isLocalUp = deltaRate2 - deltaRate1 < 0 ? true : false

		} while (isUp != isLocalUp || r1 == p1 || r2 == p2)

		const answers = [
			"Vzroste",
			"Klesne"
		]

		const correctAnswer = isUp ? 0 : 1

		this.taskString = `
			Jak zareagují občané dané ekonomiky, pokud úrokové sazby v hypotečních úvěrů vzrostou z ${r1}% na ${r2}% a zároveň se očekává zvýšení růstu cen domů a bytů ze ${p1}% na ${p2}% . Vzroste poptávka po nových bytech a domech?
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