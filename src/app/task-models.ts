export class TaskType {
    id: number;
    name: string;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export class Task {
    id: number;
    name: string;
    type: TaskType;
    creationDate: Date;
    endDate: Date;
    statusCode: string;
    progress: number;
    constructor(
        id,
        name,
        taskType,
        creationDate,
        endDate,
        statusTypeCode,
        progress) {
        this.id = id;
        this.name = name;
        this.type = taskType;
        this.creationDate = creationDate || new Date();
        this.endDate = endDate || null;
        this.statusCode = statusTypeCode || TaskStatusCodeEnum.QUEUED;
        this.progress = progress || 0;
    }
}

export class TaskStatusCodeEnum {
    static get QUEUED() { return 'QUEUED'; }
    static get RUNNING() { return 'RUNNING'; }
    static get CANCELED() { return 'CANCELED'; }
    static get FINISHED() { return 'FINISHED'; }
    static get FAILED() { return 'FAILED'; }

    static getNames() {
        return [
            TaskStatusCodeEnum.QUEUED,
            TaskStatusCodeEnum.RUNNING,
            TaskStatusCodeEnum.CANCELED,
            TaskStatusCodeEnum.FINISHED,
            TaskStatusCodeEnum.FAILED
        ];
    }

    // static isDefined(status) {
    //     return this.hasOwnProperty(status);
    // }
}
