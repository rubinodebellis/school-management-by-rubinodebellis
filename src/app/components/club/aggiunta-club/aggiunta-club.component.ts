import { Component,OnDestroy,OnInit,ViewChild } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { UserDataService } from '../../../services/user-data.service';
import { NgForm } from '@angular/forms';
import { FbService } from '../../../services/fb.service';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@Component({
  selector: 'app-aggiunta-club',
  standalone: true,
  imports: [NgxMatSelectSearchModule,MatIconModule,MatFormFieldModule,FormsModule,MatOptionModule,MatFormField,MatLabel,MatSelectModule,MatLabel,MatSelect,MatInputModule,MatButtonModule],
  templateUrl: './aggiunta-club.component.html',
  styleUrl: './aggiunta-club.component.css',
})
export class AggiuntaClubComponent implements OnDestroy,OnInit{
  constructor(public u:UserDataService, public fb:FbService){}

  allOptionsStudents:any[] = []
  filteredOptionsStudents:any[] = []
  onSearchChangeStudents(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredOptionsStudents = this.allOptionsStudents.filter((option:any) =>{ 
      return option.toLowerCase().includes(filterValue)}
    );
  }

  allOptionsProfessors:any[] = []
  filteredOptionsProfessors:any[] = []
  onSearchChangeProfessors(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredOptionsProfessors = this.allOptionsProfessors.filter((option:any) =>{ 
      return option.toLowerCase().includes(filterValue)}
    );
  }

  days = [
    {n:'mon',close:false},
    {n:'tue',close:false},
    {n:'wed',close:false},
    {n:'thu',close:false},
    {n:'fri',close:false},
    {n:'sat',close:false},
    {n:'sun',close:false}
  ]
  closing(d:number){
    this.days[d].close = !this.days[d].close
  }

  ngOnInit(): void {
    this.u.aggiuntaAttiva.clubs = true
    if(this.u.header.students && this.u.header.students.length > 0){
      this.u.header.students.forEach((i:any) => {
        this.allOptionsStudents.push(i.name + ' ' + i.surname + ', ' + (!i.classes || i.classes.length == 0?'no class':this.u.datiUtente.classes[i.classes[0]].fullDef))
        this.filteredOptionsStudents = this.allOptionsStudents
      }); 
    }
    if(this.u.header.professors && this.u.header.professors.length > 0){
      this.u.header.professors.forEach((i:any) => {
        this.allOptionsProfessors.push(i.name + ' ' + i.surname)
        this.filteredOptionsProfessors = this.allOptionsProfessors
      }); 
    }
  }
  ngOnDestroy(): void {
    this.u.aggiuntaAttiva.clubs = false
  }

  @ViewChild('aggiunta') formAggiunta!:NgForm
  aggiuntaElemento(f:NgForm){
    let schedule:any = {
      mon:'no schedule',
      tue:'no schedule',
      wed:'no schedule',
      thu:'no schedule',
      fri:'no schedule',
      sat:'no schedule',
      sun:'no schedule',
    }
    let times:any = {}
    Object.keys(schedule).forEach((k:any)=>{
      if(f.value['op'+k]){
        schedule[k] = f.value['op'+k] + ' - ' + f.value['cl'+k]
        times['op'+k] = f.value['op'+k]
        times['cl'+k] = f.value['cl'+k]
      }else{
        schedule[k] = 'no schedule'
        times['op'+k] = 'no'
        times['cl'+k] = 'no'
      }
    })
    Object.keys(schedule).forEach((k:any)=>{
      console.log(schedule[k])
    })
    if(this.u.datiUtente.clubs == undefined){
      this.u.datiUtente['clubs'] = [
        {
          id:0,
          name:f.value.nome,
          place:f.value.luogo,
          schedule:schedule,
          times:times,
          students:f.value.studenti?f.value.studenti:[],
          professors:f.value.professori?f.value.professori:[],
          fullDef:f.value.nome,
          deleting:false
        }
      ]
    this.u.updateRefOnAdd(f,'studenti','clubs','students',true)
    this.u.updateRefOnAdd(f,'professori','clubs','professors',true)
    }else{
      this.u.datiUtente.clubs.push({
        id:this.u.datiUtente.clubs.length,
        name:f.value.nome,
        place:f.value.luogo,
        schedule:schedule,
        times:times,
        students:f.value.studenti?f.value.studenti:[],
        professors:f.value.professori?f.value.professori:[],
        fullDef:f.value.nome,
        deleting:false
      })
      this.u.updateRefOnAdd(f,'studenti','clubs','students',false)
      this.u.updateRefOnAdd(f,'professori','clubs','professors',false)
    }
    this.fb.salvataggio()
    this.u.updateHeader()
    this.u.movePagination('clubs')
    f.reset()
  }
}
