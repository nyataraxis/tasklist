import { Task,TaskType,TaskStatusCodeEnum } from '../task-models';
import {TasksService} from '../tasks.service';

import {CdkTableModule} from '@angular/cdk/table';
import{ Observable, Subscription} from 'rxjs/Rx';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  
  tasks: Task[];
  taskProv: Observable<Task[]>;
  tasksRes: Observable<Task[]>;
  results: string[];
  
  constructor(private taskService: TasksService) { }
  
  getTasks(): void{
  	this.taskService.getTasks().subscribe(tasks => this.tasks=tasks)
  }
  ngOnInit() {
    this.getTasks();
  }

  
  // constructor(entities) {
  //       this.entities = entities;
  //   }

    // getNewId(list) { return (_.max(list.map(item => item.id)) + 1) || 0; }

    // createTaskType(name) {
    //     const newId = this.getNewId(this.entities.taskTypes);
    //     this.entities.taskTypes.push(new Models.TaskType(newId, name));
    //     return newId;
    // }

    // getTaskTypes() {
    //     return this.entities.taskTypes;
    // }

    // getTaskStatusTypes() {
    //     return Models.TaskStatusCodeEnum.getNames();
    // }

    // createTask(name, taskTypeId, creationDate, endDate, statusCode, progress) {
    //     const taskTypeResult = this.getTaskType(taskTypeId);
    //     if (taskTypeResult.code === Results.OperationResultCodeEnum.NOT_FOUND) {
    //         return Results.OperationResult.InvalidArguments();
    //     }
    //     const newId = this.getNewId(this.entities.tasks);
    //     const newTask = new Models.Task(newId, name, taskTypeResult.params, creationDate, endDate, statusCode, progress);
    //     this.entities.tasks.push(newTask);

    //     return Results.OperationResult.Success({ id: newId });
    // }

    // getTaskType(taskTypeId) {
    //     const foundTaskType = _.find(this.entities.taskTypes, { id: taskTypeId });
    //     return foundTaskType ?
    //         Results.OperationResult.Success(foundTaskType) :
    //         Results.OperationResult.NotFound();
    // }

    // getTasks(filter) {
    //     if (!filter) {
    //         return this.entities.tasks;
    //     } else {
    //         return this.filterTasks(this.entities.tasks, filter);
    //     }
    // }

    // filterTasks(tasks, filter) {
    //     return _.filter(tasks, task => {
    //         return (filter.name ? task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1 : true) &&
    //             (filter.from ? moment(task.creationDate) >= moment(filter.from) : true) &&
    //             (filter.to ? moment(task.creationDate) <= moment(filter.to) : true) &&
    //             (filter.typeId ? this.filterByTypeId(task, filter.typeId) : true) &&
    //             (filter.statusCode ? this.filterByStatusCode(task, filter.statusCode) : true)
    //     });
    // }

    // filterByTypeId(task, typeId) {
    //     if (Array.isArray(typeId)) {
    //         return typeId.map((id) => parseInt(id)).includes(task.type.id);
    //     }
    //     return parseInt(typeId) === task.type.id;
    // }

    // filterByStatusCode(task, statusCode) {
    //     const taskStatusCode = task.statusCode.toLowerCase();
    //     if (Array.isArray(statusCode)) {
    //         return statusCode.map((code) => code.toLowerCase()).includes(taskStatusCode);
    //     }
    //     return taskStatusCode === statusCode.toLowerCase();
    // }

    // getTask(id) {
    //     const foundTask = _.find(this.entities.tasks, { id });
    //     return foundTask ?
    //         Results.OperationResult.Success(foundTask) :
    //         Results.OperationResult.NotFound();
    // }
    // deleteTask(id) {
    //     return _.remove(this.entities.tasks, { id }).length > 0 ?
    //         Results.OperationResult.Success() :
    //         Results.OperationResult.NotFound();
    // }
    // updateTask(id, name, taskTypeId, creationDate, endDate, statusCode, progress) {
    //     const taskResult = this.getTask(id);
    //     if (taskResult.code === Results.OperationResultCodeEnum.NOT_FOUND) {
    //         return Results.OperationResult.NotFound();
    //     }
    //     const taskTypeResult = this.getTaskType(taskTypeId);
    //     if (taskTypeResult.code === Results.OperationResultCodeEnum.NOT_FOUND) {
    //         return Results.OperationResult.InvalidArguments();
    //     }

    //     const task = taskResult.params;
    //     task.name = name;
    //     task.type = taskTypeResult.params;
    //     task.creationDate = creationDate || task.creationDate;
    //     task.endDate = endDate || task.endDate;
    //     task.statusCode = statusCode || task.statusCode;
    //     task.progress = progress || task.progress;

    //     return Results.OperationResult.Success();
    // }

    // updateTaskProgress(id, progress) {
    //     const taskResult = this.getTask(id);
    //     if (taskResult.code === Results.OperationResultCodeEnum.NOT_FOUND) {
    //         return Results.OperationResult.NotFound();
    //     }
    //     const task = taskResult.params;
    //     task.progress = progress > 100 ? 100 : progress;
    //     task.statusCode = task.progress === 100 ? Models.TaskStatusCodeEnum.FINISHED : task.statusCode;

    //     return Results.OperationResult.Success();
    // }

    // updateTaskStatus(id, statusCode) {
    //     const taskResult = this.getTask(id);
    //     if (taskResult.code === Results.OperationResultCodeEnum.NOT_FOUND) {
    //         return Results.OperationResult.NotFound();
    //     }
    //     const task = taskResult.params;
    //     if (!Models.TaskStatusCodeEnum.isDefined(statusCode)) {
    //         return Results.OperationResult.InvalidArguments();
    //     }
    //     taskResult.params.statusCode = statusCode;

    //     return Results.OperationResult.Success();
    // }
}
