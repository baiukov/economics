import { ITask } from './Itask.js'
import { Topic } from './Topic.js'
import { topicNames } from './configs/topicConfig.js'
import { PageBuilder } from './pageBuilder.js'
import { Task1006 } from './tasks/task1006.js'
import { Task718 } from './tasks/task718.js'

export class Economy {
	private topics: Array<Topic> = [];
	private static instance: Economy
	private pageBuilder: PageBuilder | undefined
	private tasks: Record<number, ITask> = {}

	private constructor() {
		// topics creation
		this.pageBuilder = PageBuilder.getPageBuilder()
		this.generateAllTasks()
		Object.entries(topicNames).forEach(([number, properties]) => {
			const numberInt = parseInt(number)
			const tasks: Array<ITask> = []
			properties.tasks.forEach((taskNumber: number) => {
				tasks.push(this.tasks[taskNumber])
			})
			const topic = new Topic(numberInt, properties.name, tasks)
			this.topics.push(topic)
		})
	}

	public static getEconomy() {
		if (!this.instance) this.instance = new Economy()
		return this.instance
	}


	public getTopics() { return this.topics }

	private generateAllTasks() {
		this.tasks[1006] = new Task1006()
		this.tasks[718] = new Task718()
	}
}