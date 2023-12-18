import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { TaskTest } from './taskTest.js'

export class Task802 implements ITask {
	private taskNumber: number = 802;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		const isSingleElastic = getRandom(99, 0) < 30
		const isElastic = getRandom(99, 0) < 50
		let demand = isElastic ? "elastické" : "neelastické"
		demand = isSingleElastic ? "jednotkově elastické" : demand


		this.taskString = `
			Jak nedokonale konkurenční firma zvýší tržby v případě, že její výstup a cena 
			odpovídá cenově ${demand} části poptávky?
		`
		const answers = [
			`zvýší cenu a prodané množství`,
			`sníží cenu a zvýší prodané množství`,
			`nezmění cenu ani prodané množství`,
			`zvýší cenu a sníží prodané množství`,
			`ani jedna z alternativ není správná`,
		]
		let correctAnswer = isElastic ? 1 : 3
		correctAnswer = isSingleElastic ? 2 : correctAnswer

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