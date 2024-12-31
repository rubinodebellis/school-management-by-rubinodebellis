import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink, RouterModule } from '@angular/router';
import { UserDataService } from '../../../services/user-data.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profilo-club',
  standalone: true,
  imports: [MatIconModule,RouterModule,RouterLink],
  templateUrl: './profilo-club.component.html',
  styleUrl: './profilo-club.component.css'
})
export class ProfiloClubComponent implements OnInit,OnDestroy{
  constructor(public route:ActivatedRoute, public u:UserDataService){}
  
  id:any
  profilo:any = null
  programma:boolean = false
  studenti:boolean = false
  manager:boolean = false

  days = [
    {long:'monday',short:'mon'},
    {long:'tuesday',short:'tue'},
    {long:'wednesday',short:'wed'},
    {long:'thursday',short:'thu'},
    {long:'friday',short:'fri'},
    {long:'saturday',short:'sat'},
    {long:'sunday',short:'sun'},
  ]

  ngOnInit(){
    this.route.paramMap.subscribe((p:ParamMap)=>{
      this.u.idProfiloView.clubs = +p.get('id')!
      this.profilo = this.u.datiUtente.clubs[+p.get('id')!]
    })
  }

  ngOnDestroy(){
      this.u.idProfiloView.clubs = null
      this.profilo.clubs = null
  }

  presaId(){
    let idArray:any = []
    this.u.header.classes.forEach((i:any)=>{
      idArray.push(i.id)
    })
    return idArray
  }

  presaClasse(id:number){
    let resultArray:any
    let result:any
    resultArray = this.u.header.classes.filter((i:any)=>{return i.id == id})
    result = resultArray[0]
    return result
  }
}
