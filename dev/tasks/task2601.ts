import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { TaskTest } from './taskTest.js'

export class Task2601 implements ITask {
	private taskNumber = 2601;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		const inflationTypes: Record<string, number> = {
			"Dezinflace": 1,
			"Hyperinflace": 0,
			"Deflace": 3,
		}
		const inflationNames = Object.keys(inflationTypes)
		console.log(inflationNames.length - 1)
		const inflationType = inflationNames[getRandom(inflationNames.length - 1, 0)]

		const answers = [
			"míra inflace roste",
			"míra inflace klesá",
			"míra inflace je stabilní",
			"dochází k poklesu všeobecné cenové hladiny",
			"žádná z nabídek není správnou odpovědí"
		]
		this.taskString = `
			${inflationType} znamená, že:
		`

		const test = new TaskTest
			(
				this.taskNumber,
				this.taskString,
				answers,
				inflationTypes[inflationType]
			)
		this.taskAnswer = test.getTaskAnswer()
	}

	public getTaskAnswer() { return this.taskAnswer }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }


}