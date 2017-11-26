import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { TasksComponent } from './tasks/tasks.component';
import {CdkTableModule} from '@angular/cdk/table';
import {MatPaginatorModule, MatSortModule, MatButtonModule,MatInputModule,MatProgressSpinnerModule,MatProgressBarModule} from '@angular/material';

//import { AppRoutingModule } from './app-routing.module';
import { TableviewComponent } from './tableview/tableview.component';
import { TasksService } from './tasks.service';


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TableviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CdkTableModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule
//    AppRoutingModule
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
