import { Input, Output, Component, OnInit, TrackByFunction,EventEmitter } from '@angular/core';
import {TasksComponent} from '../tasks/tasks.component';
import{ Observable, Subscription, Observer, Subject} from 'rxjs/Rx';
import {ObserversModule}from '@angular/cdk/observers';

import {of} from 'rxjs/observable/of';
import {HttpClient, HttpClientModule, HttpParams,HttpHeaders,HttpRequest} from '@angular/common/http';
import { Task,TaskType,TaskStatusCodeEnum } from '../task-models';
import {TasksService} from '../tasks.service';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableDataSource} from '@angular/material';
import {DataSource } from '@angular/cdk/collections';
import {MatButtonModule,MatInputModule} from '@angular/material';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';

import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
const hdr = new HttpHeaders();
// .set('Content-type', 'application/json;charset=utf-8')
// .set("Access-Control-Allow-Origin", "*")
// .set('Access-Control-Allow-Methods','GET, DELETE, PUT, POST, PATCH, OPTIONS')
// .set("Access-Control-Allow-Headers",
//  "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
  

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.css']
})
export class TableviewComponent implements OnInit {

  dataSource: MyDataSource | null;

  dataObs: Observable<Task[]>;
  taskerService:TasksService;
  deleteChange:Subject<Task[]>;
  
 // dataSubject = new BehaviorSubject<any[]>([]);

  displayedColumns = ['id', 'name', 'progress'];

  dataObserve: Observer<Task[]>;

  @Output() deleteRequest = new EventEmitter<Task>();

  @Input() task: Task;
  constructor(private http:HttpClient) {
    this.taskerService = new TasksService(http);
    this.taskerService.getTasks().subscribe({
      next: value => this.taskerService.dataChange.next(value)
    });
  }

  ngOnInit() {
    this.dataSource = new MyDataSource(this.taskerService);

    this.dataObs = this.dataSource.connect();

  }

  deleteTask(id:number, index:number): void {
  
  this.taskerService.deleteTask(id, index).subscribe(response => {

    console.log(response+"heh");
    
    // this.taskService.getTasks().subscribe({
    //   next: value => this.dataSubject.next(value)
    // });
    
  }, err => {console.log(err+"")}, () => {  console.log("pep"); });
  //this.deleteRequest.emit();

  
  // let task = event.target.name;
//   this.taskService.deleteTask(row);
}


}

export class MyDataSource extends DataSource<any[]> {

  constructor(private _tasker:TasksService) {
    super ();
  }

  connect (): Observable<any[]> {
    return this._tasker.dataChange;
  }

  disconnect (  ): void {

  }

}