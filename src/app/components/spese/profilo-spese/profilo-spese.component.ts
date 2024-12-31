import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserDataService } from '../../../services/user-data.service';

@Component({
  selector: 'app-profilo-spese',
  standalone: true,
  imports: [],
  templateUrl: './profilo-spese.component.html',
  styleUrl: './profilo-spese.component.css'
})
export class ProfiloSpeseComponent implements OnInit,OnDestroy{
  constructor(public route:ActivatedRoute, public u:UserDataService){}
  
  id:any
  profilo:any = null
  
  ngOnInit(){
    this.route.paramMap.subscribe((p:ParamMap)=>{
      this.u.idProfiloView.expenses = +p.get('id')!
      this.profilo = this.u.datiUtente.expenses[+p.get('id')!]
    })
  }

  ngOnDestroy(){
      this.u.idProfiloView.expenses = null
      this.profilo = null
  }
}
