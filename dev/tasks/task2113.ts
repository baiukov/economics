import { ITask } from '../Itask.js'
import { getIncomeMetod } from '../utils/getIncomeMethod.js'

export class Task2113 implements ITask {
	private taskNumber = 2113;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {
		const incomeMethodElements = getIncomeMetod()
		console.log(incomeMethodElements)
	}


	public getTaskAnswer() { return this.taskAnswer }
	public getTaskNumber() { return this.taskNumber }
	public getTaskString() { return this.taskString }

}