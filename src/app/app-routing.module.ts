import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TasksComponent} from './tasks/tasks.component';
import {TableviewComponent} from './tableview/tableview.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/table', pathMatch: 'full' },
  { path: 'table', component: TableviewComponent },
  { path: 'tasks', component: TasksComponent },
//  { path: 'detail/:id', component: TaskDetailComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
