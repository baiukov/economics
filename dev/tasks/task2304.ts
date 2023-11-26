import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { TaskTest } from './taskTest.js'

export class Task2304 implements ITask {
	private taskNumber: number = 2304;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		let deposit, depositGrowth, rate
		do {
			deposit = getRandom(100, 1) * 1000
			depositGrowth = getRandom(200, deposit) * 1000

			rate = (deposit / depositGrowth) * 100
		} while ((rate * 10) % 1 != 0 && rate > 0)

		const answers = [
			rate.toFixed(1) + " %",
			(rate + getRandom(20, 5)).toFixed(1) + " %",
			(rate - getRandom(3, 1)).toFixed(1) + " %",
			Math.floor((rate * 1.5)).toFixed(1) + " %",
			"žádná z nabídek není správnou odpovědí",
		]

		const correctAnswer = 0

		this.taskString = `
		Jediná banka v dané ekonomice se žádnými předchozími nadbytečnými rezervami přijímá nové vklady ve výši ${deposit} EURO. Všechny takto vzniklé nadbytečné rezervy použije k expanzi deposit ve výši ${depositGrowth} EURO. Jaká je požadovaná povinná míra rezerv?
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