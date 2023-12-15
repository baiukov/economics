import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { TaskTest } from './taskTest.js'

export class Task105 implements ITask {
	private taskNumber: number = 105;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		let schoolFee = getRandom(5, 50)
		const salary = getRandom(500, schoolFee + 1)

		this.taskString = `
			Pokud školné plus ostatní výdaje na studium na vysoké škole činí ročně ${schoolFee} 000 Kč a 
			Vaší druhou alternativou je zaměstnání s ročním platem ${salary} 000 Kč, pak náklady 
			obětované příležitosti vašeho ročního působení na této škole jsou :
		`

		const answers = [
			`${salary} 000 Kč`,
			`${schoolFee} 000 Kč`,
			`${salary + schoolFee} 000 Kč`,
			`${salary - schoolFee} 000 Kč`
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