import { Component, OnDestroy, SimpleChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink, RouterModule } from '@angular/router';
import { UserDataService } from '../../../services/user-data.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profilo-gite',
  standalone: true,
  imports: [RouterModule, RouterLink,MatIconModule],
  templateUrl: './profilo-gite.component.html',
  styleUrl: './profilo-gite.component.css'
})
export class ProfiloGiteComponent implements OnInit,OnDestroy{
  constructor(public route:ActivatedRoute, public u:UserDataService){}
  
  id:any
  profilo:any = null
  responsabili:boolean = false
  studenti:boolean = false
  
  ngOnInit(){
    this.route.paramMap.subscribe((p:ParamMap)=>{
      this.u.idProfiloView.trips = +p.get('id')!
      this.profilo = this.u.datiUtente.trips[+p.get('id')!]
    })
  }

  ngOnDestroy(){
      this.u.idProfiloView.trips = null
      this.profilo.trips = null
  }
}