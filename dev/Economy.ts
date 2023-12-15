import { ITask } from './Itask.js'
import { Topic } from './Topic.js'
import { testTasks } from './configs/taskTestConfig.js'
import { topicNames } from './configs/topicConfig.js'
import { PageBuilder } from './pageBuilder.js'
import { Task1006 } from './tasks/task1006.js'
import { Task105 } from './tasks/task105.js'
import { Task106 } from './tasks/task106.js'
import { Task205 } from './tasks/task205.js'
import { Task2103 } from './tasks/task2103.js'
import { Task2110 } from './tasks/task2110.js'
import { Task2111 } from './tasks/task2111.js'
import { Task2112 } from './tasks/task2112.js'
import { Task212 } from './tasks/task212.js'
import { Task215 } from './tasks/task215.js'
import { Task216 } from './tasks/task216.js'
import { Task2211 } from './tasks/task2211.js'
import { Task2212 } from './tasks/task2212.js'
import { Task2213 } from './tasks/task2213.js'
import { Task2301 } from './tasks/task2301.js'
import { Task2303 } from './tasks/task2303.js'
import { Task2304 } from './tasks/task2304.js'
import { Task2305 } from './tasks/task2305.js'
import { Task2310 } from './tasks/task2310.js'
import { Task2311 } from './tasks/task2311.js'
import { Task2312 } from './tasks/task2312.js'
import { Task2313 } from './tasks/task2313.js'
import { Task2314 } from './tasks/task2314.js'
import { Task2510 } from './tasks/task2510.js'
import { Task2511 } from './tasks/task2511.js'
import { Task2601 } from './tasks/task2601.js'
import { Task2606 } from './tasks/task2606.js'
import { Task2610 } from './tasks/task2610.js'
import { Task2611 } from './tasks/task2611.js'
import { Task2612 } from './tasks/task2612.js'
import { Task2613 } from './tasks/task2613.js'
import { Task301 } from './tasks/task301.js'
import { Task303 } from './tasks/task303.js'
import { Task304 } from './tasks/task304.js'
import { Task311 } from './tasks/task311.js'
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

		this.tasks[105] = new Task105()
		this.tasks[106] = new Task106()

		this.tasks[205] = new Task205()
		this.tasks[212] = new Task212()
		this.tasks[215] = new Task215()
		this.tasks[216] = new Task216()

		this.tasks[301] = new Task301()
		this.tasks[303] = new Task303()
		this.tasks[304] = new Task304()
		this.tasks[311] = new Task311()

		this.tasks[911] = new Task911()
		this.tasks[912] = new Task912()
		this.tasks[913] = new Task913()
		this.tasks[914] = new Task914()
		this.tasks[916] = new Task916()
		this.tasks[918] = new Task918()

		this.tasks[1006] = new Task1006()

		this.tasks[718] = new Task718()
		this.tasks[717] = new Task717()
		this.tasks[419] = new Task419()

		this.tasks[2103] = new Task2103()

		this.tasks[2110] = new Task2110()
		this.tasks[2111] = new Task2111()
		this.tasks[2112] = new Task2112()

		this.tasks[2211] = new Task2211()
		this.tasks[2212] = new Task2212()
		this.tasks[2213] = new Task2213()

		this.tasks[2301] = new Task2301()
		this.tasks[2303] = new Task2303()
		this.tasks[2304] = new Task2304()
		this.tasks[2305] = new Task2305()
		this.tasks[2310] = new Task2310()
		this.tasks[2311] = new Task2311()
		this.tasks[2312] = new Task2312()
		this.tasks[2313] = new Task2313()
		this.tasks[2314] = new Task2314()

		this.tasks[2510] = new Task2510()
		this.tasks[2511] = new Task2511()

		this.tasks[2601] = new Task2601()
		this.tasks[2606] = new Task2606()
		this.tasks[2610] = new Task2610()
		this.tasks[2611] = new Task2611()
		this.tasks[2612] = new Task2612()
		this.tasks[2613] = new Task2613()

		testTasks.forEach((testTask: Record<string, any>) => {
			const taskNumber = testTask.taskNumber
			const task = new TaskTest(taskNumber, testTask.task, testTask.answers, testTask.correctAnswer)
			this.tasks[taskNumber] = task
		})
	}
}