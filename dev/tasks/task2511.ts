import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { getRandomFloat } from '../utils/getRandomFloat.js'
import { TaskTest } from './taskTest.js'

export class Task2511 implements ITask {
	private taskNumber = 2511;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		const inflationTypes: Record<string, number> = {
			"Mírná inflace": 1,
			"Padivá inflace": 10,
			"Hyperinflace": 100,
			"Deflace": -1,
		}

		const firstYear = getRandom(2000, 1990)
		const inflationIndex = getRandom(Object.keys(inflationTypes).length - 1, 0)
		const inflationName = Object.keys(inflationTypes)[inflationIndex]
		const inflationType = inflationTypes[inflationName]

		const year = firstYear + getRandom(9, 0)
		const inflation = getRandomFloat(10 * inflationType, inflationType)


		let tableStrInflations = ""
		let tableStrYears = ""
		for (let i = 0; i < 10; i++) {
			const currentYear = firstYear + i
			let currentInflation = currentYear == year ? inflation : getRandomFloat(20, 0.1) * 10
			tableStrInflations += `
					<td>${currentInflation.toFixed(1)}%</td>
			`
			tableStrYears += `
					<td>${currentYear}</td>
			`
		}

		this.taskString = `
			<table>
				<tbody>
				<tr>
					<td>Míra inflace</td>
					${tableStrYears}
				</tr>
				<tr>
				<td></td> 
				${tableStrInflations}
				</tr>
				</tbody>
			</table>
			Jak byste nazvali inflaci například v roce ${year}?
		`

		const test = new TaskTest
			(
				this.taskNumber,
				this.taskString,
				Object.keys(inflationTypes),
				inflationIndex
			)
		this.taskAnswer = test.getTaskAnswer()
	}

	public getTaskAnswer() { return this.taskAnswer }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }


}