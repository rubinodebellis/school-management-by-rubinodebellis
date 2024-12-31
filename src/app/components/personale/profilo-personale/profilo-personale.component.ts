import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserDataService } from '../../../services/user-data.service';

@Component({
  selector: 'app-profilo-personale',
  standalone: true,
  imports: [],
  templateUrl: './profilo-personale.component.html',
  styleUrl: './profilo-personale.component.css'
})
export class ProfiloPersonaleComponent implements OnInit,OnDestroy{
  constructor(public route:ActivatedRoute, public u:UserDataService){}
  
  id:any
  profilo:any = null
  
  ngOnInit(){
    this.route.paramMap.subscribe((p:ParamMap)=>{
      this.u.idProfiloView.staff = +p.get('id')!
      this.profilo = this.u.datiUtente.staff[+p.get('id')!]
    })
  }

  ngOnDestroy(){
      this.u.idProfiloView.staff = null
      this.profilo.staff = null
  }
}