import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskType, TaskStatusCodeEnum } from './task-models';
import{ Observable, Subscription, Subject} from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class TasksService {

  private taskUpd = new EventEmitter();
  private taskData: Observable<Task[]>;
  private taskVals: Task[] = [];
  private anyErrors: boolean;
  private finished: boolean;
  status: string;
  
  dataChange: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  get data(): Task[] { return this.dataChange.value; }
  
  res: string[];
  
  private tasksUrl = 'http://localhost:8080/api/tasks';
  
  ngOnInit(){
  }
  
  constructor(private http: HttpClient) { 
  	this.getTasks().subscribe(tasks => this.taskVals = tasks);
   }
  
  private taskUrl = 'http://localhost:8080/api/tasks';  // URL to web api

  getTasks(): Observable<Task[]> {
  	
    this.taskData = this.http.get<Task[]>(this.taskUrl)
    .pipe(
	  tap(tasks => console.log(`fetched tasks`)),
	  catchError(this.handleError('getTasks', []))
	);
   return this.taskData;
   }
   
   private handleError<T> (operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }
  
  getTask(id:number): Observable<Task>{
  	const url=`${this.taskUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_=>console.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }
  
  updateTask({id,name,typeId}): Observable<any>{
  	
  return this.http.put(this.tasksUrl, {id,name,typeId}, httpOptions).pipe(
    tap(_ => {console.log(`updated task id=${id}`);this.taskUpd.emit(this.dataChange);}),
    catchError(this.handleError<any>('updateTask'))
  ); 
  }
  
  /** DELETE: delete the hero from the server */
  deleteTask (task:Task | number, indIn: number): Observable<Task> {
  const id = typeof task === 'number' ? task : task.id;
  const url = `${this.tasksUrl}/${id}`;
  // const newData = this.data.splice(indIn,1);
  // this.taskData.subscribe({
  //   next: newData => this.dataChange.next(newData);

  // });
  //const copiedData = this.data.slice();
  const newData = this.data.splice(indIn,1);
  this.dataChange.next(this.data);
  //newSubj.next()
  return this.http.delete<Task>(url, httpOptions).pipe(

    tap(_ => {console.log(`deleted task id=${id}`)}
   ),
    catchError(this.handleError<Task>('deleteTask'))
  );
}
  addTask (name, typeId): Observable<Task> {
  	
  return this.http.post<Task>(this.tasksUrl, {'name': name, 'typeId':typeId}, httpOptions).pipe(
    tap((task:Task) => {console.log(`added hero w/ id=${task.id}`);this.taskUpd.emit(this.dataChange);}),
    catchError(this.handleError<Task>('addTask'))
  );
}
}
