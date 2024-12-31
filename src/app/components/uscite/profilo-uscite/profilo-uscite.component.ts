import { Component, OnDestroy, SimpleChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink, RouterModule } from '@angular/router';
import { UserDataService } from '../../../services/user-data.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profilo-uscite',
  standalone: true,
  imports: [RouterModule, RouterLink,MatIconModule],
  templateUrl: './profilo-uscite.component.html',
  styleUrl: './profilo-uscite.component.css'
})
export class ProfiloUsciteComponent implements OnInit,OnDestroy{
  constructor(public route:ActivatedRoute, public u:UserDataService){}
  
  id:any
  profilo:any = null
  responsabili:boolean = false
  studenti:boolean = false
  
  ngOnInit(){
    this.route.paramMap.subscribe((p:ParamMap)=>{
      this.u.idProfiloView.outgoings = +p.get('id')!
      this.profilo = this.u.datiUtente.outgoings[+p.get('id')!]
    })
  }

  ngOnDestroy(){
      this.u.idProfiloView.outgoings = null
      this.profilo.outgoings = null
  }
}