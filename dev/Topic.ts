import { ITask } from './Itask.js'
import { PageBuilder } from './pageBuilder.js'

export class Topic {
	private tasks: Array<ITask>
	private number: number = 0;
	private name: string = "";
	private pageBuilder: PageBuilder = PageBuilder.getPageBuilder();
	private selfHTML: HTMLDivElement | undefined

	public constructor(number: number, name: string, tasks: Array<ITask>) {
		this.name = name
		this.number = number
		this.tasks = tasks

		this.selfHTML = this.pageBuilder?.addTopicDiv(number, name, tasks) as HTMLDivElement
	}
}