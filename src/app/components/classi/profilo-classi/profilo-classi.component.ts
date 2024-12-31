import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink, RouterModule } from '@angular/router';
import { UserDataService } from '../../../services/user-data.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profilo-classi',
  standalone: true,
  imports: [MatIconModule,RouterModule,RouterLink],
  templateUrl: './profilo-classi.component.html',
  styleUrl: './profilo-classi.component.css'
})
export class ProfiloClassiComponent implements OnInit,OnDestroy{
  constructor(public route:ActivatedRoute, public u:UserDataService){}
  
  id:any
  profilo:any = null
  professori:boolean = false
  studenti:boolean = false

  ngOnInit(){
    this.route.paramMap.subscribe((p:ParamMap)=>{
      this.u.idProfiloView.classes = +p.get('id')!
      this.profilo = this.u.datiUtente.classes[+p.get('id')!]
    })
  }

  ngOnDestroy(){
      this.u.idProfiloView.classes = null
      this.profilo.classes = null
  }
}