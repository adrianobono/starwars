import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TestService } from './test.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  page: number =1;
  pages: number = 0;
  homeRoute ="load";
  gameRoute = "game"
  title = 'StarQuiz';
  routes =[
    {linkName: 'Home', url: 'load'},
    {linkName: 'Game', url: 'game'}
  ];
  result =[];

  constructor(svc: TestService, private http: HttpClient) { 

    svc.printToConsole('Got the service');
   }

   ngOnInit() {
   }
 

  
 
  }
