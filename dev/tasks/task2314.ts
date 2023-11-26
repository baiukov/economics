import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { TaskTest } from './taskTest.js'

export class Task2314 implements ITask {
	private taskNumber: number = 2314;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		const isInCorrect = getRandom(99, 0) < 30

		const rezerves = getRandom(100, 10)
		const deposits = getRandom(500, 100)
		const timeDeposits = getRandom(1500, 300)
		const stock = getRandom(2000, 1000)

		const m1 = deposits
		const m2 = m1 + timeDeposits

		const answers = [
			`úzce definované peníze (M1) jsou ${isInCorrect ? (m1 + rezerves) : m1} mld a široce definované peníze (M2) jsou ${m2} mld`,
			`úzce definované peníze (M1) jsou ${m1} mld a široce definované peníze (M2) jsou ${timeDeposits} mld`,
			`úzce definované peníze (M1) jsou ${m1} mld a široce definované peníze (M2) jsou ${timeDeposits + rezerves} mld`,
			`úzce definované peníze (M1) jsou ${rezerves + m1} mld a široce definované peníze (M2) jsou ${m2 + rezerves} mld`,
			"ani jedna z nabízených možností není správná"
		]

		console.log(isInCorrect)
		const correctAnswer = isInCorrect ? 5 : 0

		this.taskString = `
			Bankovní rezervy ekonomiky činí celkem ${rezerves} mld. Veškeré peněžní zůstatky mají podobu bankvních vkladů. Vklady na běžných účtech činí celkem ${deposits} mld. Termínované vklady činí celkem ${timeDeposits} mld. Cenné papíry v rukou domácích subjektů jsou odhadovány na ${stock} mld. Pak platí, že: 
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