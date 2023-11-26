import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { TaskTest } from './taskTest.js'

export class Task2301 implements ITask {
	private taskNumber: number = 2301;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		const isZero = getRandom(99, 0) < 25
		const inflation = Math.floor(getRandom(15, 1))
		const interest = isZero ? inflation : Math.floor(getRandom(15, 1))
		const answers = [
			"reálná úroková sazba byla nulová",
			"reálná úroková sazba byla kladná",
			"reálná úroková sazba byla záporná",
			"došlo k přerozdělení od dlužníků k věříitelům",
			"kupní síla nominální sumy úspor (jistiny plus úroku) vzrostla",
		]

		const realInterest = interest - inflation
		const correctAnswer = isZero ? 0 : (realInterest <= 0 ? 2 : 1)

		this.taskString = `
		Ve sledované ekonomice míra inflace dosáhla ${inflation}% a nominální úroková sazba činila ${interest}%. Které z nasledujících tvrzení je správné?<br>
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