import { Topic } from './Topic.js';
import { topicNames } from './configs/topicConfig.js';
import { PageBuilder } from './pageBuilder.js';
import { Task1006 } from './tasks/task1006.js';
import { Task717 } from './tasks/task717.js';
import { Task718 } from './tasks/task718.js';
export class Economy {
    constructor() {
        this.topics = [];
        this.tasks = {};
        // topics creation
        this.pageBuilder = PageBuilder.getPageBuilder();
        this.generateAllTasks();
        Object.entries(topicNames).forEach(([number, properties]) => {
            const numberInt = parseInt(number);
            const tasks = [];
            properties.tasks.forEach((taskNumber) => {
                tasks.push(this.tasks[taskNumber]);
            });
            const topic = new Topic(numberInt, properties.name, tasks);
            this.topics.push(topic);
        });
    }
    static getEconomy() {
        if (!this.instance)
            this.instance = new Economy();
        return this.instance;
    }
    getTopics() { return this.topics; }
    generateAllTasks() {
        this.tasks[1006] = new Task1006();
        this.tasks[718] = new Task718();
        this.tasks[717] = new Task717();
    }
}
