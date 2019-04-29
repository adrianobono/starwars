import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from "rxjs";
import { TestService } from '../test.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  
  loadedCharacter: {};
  page: number = 0;
  pages: number = 0;
  timer = new Date("2019 00:2:00").getTime();
  minutos: number = 2;
  segundo: number = 0;
  segundos: number = 0;
  dif: number;
  score: number = 0;
  result = [];
  pagination = [0, 1, 2, 3, 4, 5, 6, 7];
  showCards = [];
  interval;
  status = new Array(87);
  setvalues = new Array(87);
  pontos: number = 0;
  showdica = false;
  showpontos = false;
  mass: string;
  pheight: string;
  hair: string;
  firstchar:string;
  picture:string;



  constructor(svc: TestService, private http: HttpClient) {

    svc.printToConsole('Got the service');
  }

  startGame() {
    
    this.interval = setInterval(() => {
    this.segundo = this.segundo + 1000;
    this.dif = this.timer - this.segundo;
    if (this.minutos + this.segundos != 0) {
      this.minutos = Math.floor((this.dif % (1000 * 60 * 60)) / (1000 * 60));
      this.segundos = Math.floor((this.dif % (1000 * 60)) / 1000);
    }
    else {
      this.showpontos=true;
    }
      }, 1000);
    
  }

  setplus() {

    this.page++;
    
    for (let i = 0; i < 8; i++) {
      this.pagination[i] = this.pagination[i] + 8;
    }

    for (let i = 0; i < this.showCards.length; i++) {
      this.showCards[i] = this.result[this.pagination[i]];

    }

  }

  details(index) {

    this.mass = this.result[this.pagination[index]].mass;
    this.pheight = this.result[this.pagination[index]].height;
    this.hair =  this.result[this.pagination[index]].hair_color;
    this.firstchar = (this.result[this.pagination[index]].name).charAt(0);
    this.picture= "../assets/imgs/"+this.pagination[index]+".jpg"
    this.showdica = true;

  }

  setMin() {
    
    this.page--;
    
    for (let i = 0; i < 8; i++) {
      this.pagination[i] = this.pagination[i] - 8;
    }

    for (let i = 0; i < this.showCards.length; i++) {
      this.showCards[i] = this.result[this.pagination[i]];

    }
  
  }

  checkName(index, name) {

    if (name.toUpperCase() == this.result[this.pagination[index]].name.toUpperCase()) {
      this.status[this.pagination[index]] = 1;
      if(this.setvalues[this.pagination[index]]==5){
        this.pontos = this.pontos+5;
        this.status[this.pagination[index]]=2;
      }
      else {
        this.pontos = this.pontos+10;
      }
    }
    else {
      this.status[this.pagination[index]] = 0;
    }

  }

  ngOnInit() {

    let character1 = this.http.get('https://swapi.co/api/people/?page=1');
    let character2 = this.http.get('https://swapi.co/api/people/?page=2');
    let character3 = this.http.get('https://swapi.co/api/people/?page=3');
    let character4 = this.http.get('https://swapi.co/api/people/?page=4');
    let character5 = this.http.get('https://swapi.co/api/people/?page=5');
    let character6 = this.http.get('https://swapi.co/api/people/?page=6');
    let character7 = this.http.get('https://swapi.co/api/people/?page=7');
    let character8 = this.http.get('https://swapi.co/api/people/?page=8');
    let character9 = this.http.get('https://swapi.co/api/people/?page=9');


    forkJoin([character1, character2, character3, character4, character5, character6, character7, character8, character9]).subscribe(list => {


      for (let i = 0; i < 1; i++) {
        for (let j = 0; j < 8; j++) {
          this.showCards.push(list[i].results[j]);
        }
      }

      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].results.length; j++) {
          this.result.push(list[i].results[j]);
        }
      }
      this.startGame();
    });
    console.log(this.result)
 
  }

  fullList(response) {

    console.log(response.count)
    let pages = Math.ceil(response.count / response.results.length);
    for (let i = 1; i < pages + 1; i++) {
      let obs2 = this.http.get('https://swapi.co/api/people/' + i + '/')
      obs2.subscribe((resp) => {
        for (let j = 0; j < resp.results.length; j++) {
          this.result.push(resp.results[j]);
        }
        if (i + 1 == pages) this.startGame();
        console.log(this.result)
      })

    }


  }

}
