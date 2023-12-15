import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'
import { TaskTest } from './taskTest.js'

export class Task301 implements ITask {
	private taskNumber: number = 301;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		const isPrice = getRandom(99, 0) < 50
		let elasticity, delta1, delta2
		do {
			elasticity = parseFloat(getRandomFloat(0.9, 0.1).toFixed(1))
			delta1 = getRandom(10, 1)
			delta2 = isPrice ? delta1 / elasticity : delta1 * elasticity
		} while (delta2 * 10 % 1 != 0 || delta2 <= 0)

		this.taskString = `
			Hodnota EPD = ${elasticity} znamená, že procentní změna ${isPrice ? "ceny" : "množství"} při  ${delta1}% změně ${isPrice ? "množství" : "ceny"} bude : 
		`
		const answers = [
			`${elasticity}%`,
			`${(elasticity * delta1).toFixed(1)}%`,
			`${(delta1 / elasticity).toFixed(1)}%`,
			`${(elasticity / delta1).toFixed(1)}%`,
			`${delta1}%`,
			"ze zadaných údajů nelze určit"
		]
		const correctAnswer = isPrice ? 2 : 1

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