export interface ITask {
	getTaskAnswer: () => HTMLDivElement | undefined
	getTaskNumber: () => number | undefined
	getTaskString: () => string | undefined
}