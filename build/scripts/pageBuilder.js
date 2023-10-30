export class PageBuilder {
    constructor() {
        this.topicDivs = {};
        this.topicsDiv = document.querySelector("#topics");
    }
    static getPageBuilder() {
        if (this.pageBuilder == undefined)
            this.pageBuilder = new PageBuilder();
        return this.pageBuilder;
    }
    addTopicDiv(number, name, tasks) {
        var _a;
        const topicDiv = this.createElement('div', {
            attributes: [
                { attribute: 'id', value: `topic-${number}` },
                { attribute: 'class', value: 'topic' }
            ]
        });
        const topicH3 = this.createElement('h3', {
            innerText: name,
        });
        topicDiv.appendChild(topicH3);
        this.topicDivs[number] = topicDiv;
        (_a = this.topicsDiv) === null || _a === void 0 ? void 0 : _a.appendChild(topicDiv);
        tasks.forEach((task) => {
            this.createTaskElem(task, topicDiv);
        });
        return topicDiv;
    }
    createElement(elementType, properties) {
        const newElement = document.createElement(elementType);
        if (properties.attributes) {
            properties.attributes.forEach((attribute) => {
                newElement.setAttribute(attribute.attribute, attribute.value);
            });
        }
        newElement.innerHTML = properties.innerText ? properties.innerText : "";
        return newElement;
    }
    createTaskElem(task, topicDiv) {
        const taskDiv = this.createElement('div', {
            attributes: [{ attribute: "class", value: "task" }]
        });
        const taskH4 = this.createElement('h4', {
            innerText: `Task №${task.getTaskNumber()}`
        });
        const taskP = this.createElement('p', {
            innerText: task.getTaskString()
        });
        taskDiv.appendChild(taskH4);
        taskDiv.appendChild(taskP);
        topicDiv.appendChild(taskDiv);
        taskDiv.appendChild(task.getTaskAnswer());
        return taskDiv;
    }
}
PageBuilder.pageBuilder = undefined;
