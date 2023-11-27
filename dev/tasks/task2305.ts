import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { TaskTest } from './taskTest.js'

export class Task2305 implements ITask {
	private taskNumber: number = 2305;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		const isGrowth = getRandom(99, 0) < 50

		const answers = [
			"růstu produktu nad potenciální produkt a zvýšení cenové hladiny",
			"poklesu produktu pod potenciální produkt a poklesu cenové hladiny",
			"růstu produktu nad potenciální produkt a poklesu cenové hladiny",
			"poklesu produktu pod potenciální produkt a růstu cenové hladiny",
			"poklesu potenciálního produktu a růstu cenové hladiny",
		]

		let correctAnswer = isGrowth ? 0 : 1
		const actions = [
			`${isGrowth ? "koupí" : "prodá"} na otevřeném trhu vladní obligace za`,
			`${isGrowth ? "koupí" : "prodá"} devize za domácí měnu za`,
			"poskytne úvěr komerční bance ve výši",
		]

		const action = isGrowth ?
			actions[getRandom(actions.length - 1, 0)] :
			actions[getRandom(actions.length - 2, 0)]

		this.taskString = `
			Ekonomika pracuje na úrovni potenciálního produktu. Centrální banka ${action} X Kč. Za předpokladu, že lidé tvoří adaptivní očekávání, dojde k: 
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