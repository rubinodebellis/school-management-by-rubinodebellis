import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserDataService } from '../../../services/user-data.service';

@Component({
  selector: 'app-profilo-organigramma',
  standalone: true,
  imports: [],
  templateUrl: './profilo-organigramma.component.html',
  styleUrl: './profilo-organigramma.component.css'
})
export class ProfiloOrganigrammaComponent implements OnInit,OnDestroy{
  constructor(public route:ActivatedRoute, public u:UserDataService){}
  
  id:any
  profilo:any = null
  
  ngOnInit(){
    this.route.paramMap.subscribe((p:ParamMap)=>{
      this.u.idProfiloView.flowchart = +p.get('id')!
      this.profilo = this.u.datiUtente.flowchart[+p.get('id')!]
    })
  }

  ngOnDestroy(){
      this.u.idProfiloView.flowchart = null
      this.profilo = null
  }
}
