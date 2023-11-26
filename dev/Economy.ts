import { ITask } from './Itask.js'
import { Topic } from './Topic.js'
import { testTasks } from './configs/taskTestConfig.js'
import { topicNames } from './configs/topicConfig.js'
import { PageBuilder } from './pageBuilder.js'
import { Task1006 } from './tasks/task1006.js'
import { Task2103 } from './tasks/task2103.js'
import { Task2110 } from './tasks/task2110.js'
import { Task2111 } from './tasks/task2111.js'
import { Task2112 } from './tasks/task2112.js'
import { Task2113 } from './tasks/task2113.js'
import { Task2211 } from './tasks/task2211.js'
import { Task2212 } from './tasks/task2212.js'
import { Task2301 } from './tasks/task2301.js'
import { Task2303 } from './tasks/task2303.js'
import { Task2304 } from './tasks/task2304.js'
import { Task419 } from './tasks/task419.js'
import { Task717 } from './tasks/task717.js'
import { Task718 } from './tasks/task718.js'
import { Task911 } from './tasks/task911.js'
import { Task912 } from './tasks/task912.js'
import { Task913 } from './tasks/task913.js'
import { Task914 } from './tasks/task914.js'
import { Task916 } from './tasks/task916.js'
import { Task918 } from './tasks/task918.js'
import { TaskTest } from './tasks/taskTest.js'

export class Economy {
	private topics: Array<Topic> = [];
	private static instance: Economy
	private pageBuilder: PageBuilder | undefined
	private tasks: Record<number, ITask> = {}

	private constructor() {
		// topics creation 1234555
		this.generateAllTasks()
		this.pageBuilder = PageBuilder.getPageBuilder()
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

		this.tasks[911] = new Task911()
		this.tasks[912] = new Task912()
		this.tasks[913] = new Task913()
		this.tasks[914] = new Task914()
		this.tasks[916] = new Task916()
		this.tasks[918] = new Task918()

		this.tasks[718] = new Task718()
		this.tasks[717] = new Task717()
		this.tasks[419] = new Task419()

		this.tasks[2103] = new Task2103()

		this.tasks[2110] = new Task2110()
		this.tasks[2111] = new Task2111()
		this.tasks[2112] = new Task2112()
		this.tasks[2113] = new Task2113()

		this.tasks[2211] = new Task2211()
		this.tasks[2212] = new Task2212()

		this.tasks[2301] = new Task2301()
		this.tasks[2303] = new Task2303()
		this.tasks[2304] = new Task2304()

		testTasks.forEach((testTask: Record<string, any>) => {
			const taskNumber = testTask.taskNumber
			const task = new TaskTest(taskNumber, testTask.task, testTask.answers, testTask.correctAnswer)
			this.tasks[taskNumber] = task
		})
	}
}