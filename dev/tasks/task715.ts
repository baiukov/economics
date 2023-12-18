import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { TaskTest } from './taskTest.js'

export class Task715 implements ITask {
	private taskNumber: number = 715;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		const averageFixedCost = getRandom(20, 2)

		const averageVariableCosts = getRandom(20, 3)
		const price = getRandom(averageVariableCosts - 1, 1)

		const income = Math.abs(averageVariableCosts - price)
		this.taskString = `
			Firma se pohybuje na dokonale konkurenčním trhu v krátkém období. Na
			uvažované úrovni produkce, jsou její AFC = ${averageFixedCost} Kč, AVC = ${averageVariableCosts} Kč, cena produktu je ${price}
			Kč a MC = MR. Tato firma:
		`
		const answers = [
			`bude vyrábět, protože její zisk činí ${income} Kč z výrobku`,
			`nebude vyrábět, protože má jednotkovou ztrátu ve výši ${income} Kč`,
			`bude vyrábět se ztrátou, protože cena převyšuje AVC`,
			`nebude vyrábět, protože AFC jsou menší než cena`,
			`žádná z odpovědí není správná`
		]
		const correctAnswer = 1

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