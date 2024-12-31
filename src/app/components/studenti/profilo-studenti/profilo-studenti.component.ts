import { Component, OnDestroy, SimpleChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink, RouterModule } from '@angular/router';
import { UserDataService } from '../../../services/user-data.service';

@Component({
  selector: 'app-profilo-studenti',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './profilo-studenti.component.html',
  styleUrl: './profilo-studenti.component.css'
})
export class ProfiloStudentiComponent implements OnInit,OnDestroy{
  constructor(public route:ActivatedRoute, public u:UserDataService){}
  
  id:any
  profilo:any = null
  
  ngOnInit(){
    this.route.paramMap.subscribe((p:ParamMap)=>{
      this.u.idProfiloView.students = +p.get('id')!
      this.profilo = this.u.datiUtente.students[+p.get('id')!]
    })
  }

  ngOnDestroy(){
      this.u.idProfiloView.students = null
      this.profilo.students = null
  }
}