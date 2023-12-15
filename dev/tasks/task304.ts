import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { TaskTest } from './taskTest.js'

export class Task304 implements ITask {
	private taskNumber: number = 304;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		const isSingle = getRandom(99, 0) < 30
		let p1, q1, p2, q2, elasticity, deltaP, deltaQ
		do {
			p1 = getRandom(30, 70)
			q1 = getRandom(100, 200)
			if (isSingle) {
				p2 = getRandom(100, p1 + 1)
				q2 = q1
			} else {
				q2 = getRandom(300, 1)
				p2 = getRandom(100, 1)
			}
			deltaP = p2 / p1 * 100
			if (isSingle) q2 = q1 * (p2 / p1)
			deltaQ = q2 / q1 * 100
			elasticity = isSingle ? 1 : deltaQ / deltaP
		} while (elasticity * 10 % 1 != 0 || q2 % 1 != 0)

		this.taskString = `
			Při ceně ${p1} korun se nakupuje ${q1} výrobků za 1 den; při ceně ${p2} korun se nakupuje 
			${q2} výrobků za 1 den. Koeficient cenové elasticity poptávky bude :
		`
		const answers = [
			`${elasticity.toFixed(1)}`,
			`${(elasticity * 0.5).toFixed(1)}`,
			`${(deltaP / deltaQ).toFixed(1)}`,
			`${isSingle ? (elasticity * 1.5).toFixed(1) : 1}`,
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