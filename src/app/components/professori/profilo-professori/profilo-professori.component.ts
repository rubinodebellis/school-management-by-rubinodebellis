import { Component, OnDestroy, SimpleChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink, RouterModule } from '@angular/router';
import { UserDataService } from '../../../services/user-data.service';

@Component({
  selector: 'app-profilo-professori',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './profilo-professori.component.html',
  styleUrl: './profilo-professori.component.css'
})
export class ProfiloProfessoriComponent implements OnInit,OnDestroy{
  constructor(public route:ActivatedRoute, public u:UserDataService){}
  
  id:any
  profilo:any = null
  
  ngOnInit(){
    this.route.paramMap.subscribe((p:ParamMap)=>{
      this.u.idProfiloView.professors = +p.get('id')!
      this.profilo = this.u.datiUtente.professors[+p.get('id')!]
    })
  }

  ngOnDestroy(){
      this.u.idProfiloView.professors = null
      this.profilo.professors = null
  }
}