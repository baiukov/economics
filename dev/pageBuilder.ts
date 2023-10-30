import { ITask } from './Itask.js'

type properties = {
	innerText?: string
	attributes?: Array<{
		attribute: string
		value: string
	}>
}

export class PageBuilder {
	private static pageBuilder: PageBuilder | undefined = undefined;

	private topicDivs: Record<number, HTMLDivElement> = {}
	private topicsDiv: HTMLDivElement | null

	private constructor() {
		this.topicsDiv = document.querySelector("#topics")
	}

	public static getPageBuilder() {
		if (this.pageBuilder == undefined) this.pageBuilder = new PageBuilder()
		return this.pageBuilder
	}

	public addTopicDiv(number: number, name: string, tasks: ITask[]) {
		const topicDiv: HTMLElement = this.createElement('div', {
			attributes: [
				{ attribute: 'id', value: `topic-${number}` },
				{ attribute: 'class', value: 'topic' }
			]
		})
		const topicH3 = this.createElement('h3', {
			innerText: name,
		})
		topicDiv.appendChild(topicH3)
		this.topicDivs[number] = topicDiv as HTMLDivElement
		this.topicsDiv?.appendChild(topicDiv)

		tasks.forEach((task: ITask) => {
			this.createTaskElem(task, topicDiv)
		})

		return topicDiv
	}

	public createElement(elementType: string, properties: properties) {
		const newElement = document.createElement(elementType)
		if (properties.attributes) {
			properties.attributes.forEach((attribute) => {
				newElement.setAttribute(attribute.attribute, attribute.value)
			})
		}
		console.log(properties.innerText)
		newElement.innerHTML = properties.innerText ? properties.innerText : ""

		return newElement
	}

	public createTaskElem(task: ITask, topicDiv: HTMLElement) {
		const taskDiv = this.createElement('div', {
			attributes: [{ attribute: "class", value: "task" }]
		})
		const taskH4 = this.createElement('h4', {
			innerText: `Task №${task.getTaskNumber() as number}`
		})
		const taskP = this.createElement('p', {
			innerText: task.getTaskString() as string
		})
		taskDiv.appendChild(taskH4)
		taskDiv.appendChild(taskP)
		topicDiv.appendChild(taskDiv)
		taskDiv.appendChild(task.getTaskAnswer() as HTMLDivElement)
		return taskDiv
	}

}