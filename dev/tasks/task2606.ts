import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'
import { TaskTest } from './taskTest.js'

export class Task2606 implements ITask {
	private taskNumber = 2606;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		const productivityGrowth = getRandom(10, 1)
		const wageGrowth = getRandom(15, productivityGrowth + 1)
		const priceGrowth = wageGrowth - productivityGrowth

		const answers = [
			priceGrowth.toFixed() + "%",
			(priceGrowth * getRandom(3, 1)).toFixed() + "%",
			(priceGrowth * getRandomFloat(0.4, 0.1)).toFixed() + "%",
			(priceGrowth * getRandom(6, 4)).toFixed() + "%"
		]
		const correctAnswer = 0

		this.taskString = `
			Uvažujte cenově inflační verzi Phillipsovy křivky. Tempo růstu nominálních mzdových sazeb činí ${wageGrowth} %. Tempo růstu produktivity práce ${productivityGrowth} %. Jaké bude příbližně (za jinak stejných podmínek) tempo růstu cenové hladiny
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