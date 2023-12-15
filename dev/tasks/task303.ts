import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'
import { TaskTest } from './taskTest.js'

export class Task303 implements ITask {
	private taskNumber: number = 303;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		const isSingle = getRandom(99, 0) < 30
		const isDownward = getRandom(99, 0) < 50
		let priceChange, quantityChange, elasticity
		do {
			priceChange = getRandom(90, 10)
			quantityChange = isSingle ? priceChange : getRandom(10, 1000)
			elasticity = isSingle ? 1 : quantityChange / priceChange
		} while (elasticity * 10 % 1 != 0)

		this.taskString = `
			Firma CA vyhlásila ${priceChange} % ${isDownward ? "zdražení" : "slevu"} oděvů. Jejich prodané množství ${isDownward ? "kleslo" : "vzrostlo"} o ${quantityChange} %. Cenová elasticita poptávky po oděvech tedy byla :
		`
		const answers = [
			`${elasticity}`,
			`${!isSingle ? 1 : elasticity * 0.5}`,
			`${(priceChange / quantityChange).toFixed(1)}`,
			`${getRandomFloat(0.5, 2.5)}`,
			"nelze určit"
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