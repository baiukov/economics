import { PageBuilder } from './pageBuilder.js';
export class Topic {
    constructor(number, name, tasks) {
        var _a;
        this.number = 0;
        this.name = "";
        this.pageBuilder = PageBuilder.getPageBuilder();
        this.name = name;
        this.number = number;
        this.tasks = tasks;
        this.selfHTML = (_a = this.pageBuilder) === null || _a === void 0 ? void 0 : _a.addTopicDiv(number, name, tasks);
    }
}
