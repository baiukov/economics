import { ITask } from '../Itask.js'
import { getRandom } from '../utils/getRandom.js'
import { TaskTest } from './taskTest.js'

export class Task2303 implements ITask {
	private taskNumber: number = 2303;
	private taskAnswer: HTMLDivElement | undefined
	private taskString: string | undefined

	public constructor() {

		const isInCorrect = getRandom(99, 0) < 20
		const isActives = !isInCorrect && getRandom(99, 0) < 20

		const isGrowth = !isActives && getRandom(99, 0) < 50

		let dM, r, dD
		do {
			dD = Math.floor(getRandom(50, 5))
			r = Math.floor(getRandom(10, 1))

			const rPercent = r / 100
			dM = (1 / rPercent) * dD
		} while (dM % 1 != 0 && !isInCorrect)

		const answers = [
			"nezmění se",
			`vzroste o ${r}`,
			`vzroste o ${isInCorrect ? Math.floor(dM * 1.1) : dM}`,
			`klesne o ${isInCorrect ? Math.floor(dM * 1.1) : dM}`,
			"žádná z nabídek není správnou odpovědí",
		]

		let correctAnswer = isGrowth ? 2 : 3
		correctAnswer = isActives ? 0 : correctAnswer
		correctAnswer = isInCorrect ? 4 : correctAnswer

		const actions = [
			`${isGrowth ? "koupí" : "prodá"} na otevřeném trhu vladní obligace za `,
			`${isGrowth ? "koupí" : "prodá"} devize za domácí měnu za `,
			"poskytne úvěr komerční bance ve výši ",
		]

		const action = isGrowth ?
			actions[getRandom(actions.length - 1, 0)] :
			actions[getRandom(actions.length - 2, 0)]

		this.taskString = `
		Centrální banka ${action} ${dD} mld. Kč. Neexistuje hotovostní oběživo. Přesně dodržovaná sazba povinných minimálních rezerv činí ${r}%. ${!isActives ? "Jak se změní peněžní zásoba (v mld. Kč)?" : "Aktiva centrální banky: "}
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