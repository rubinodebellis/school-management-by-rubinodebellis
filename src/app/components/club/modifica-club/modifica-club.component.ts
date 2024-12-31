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
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@Component({
  selector: 'app-modifica-club',
  standalone: true,
  imports: [NgxMatSelectSearchModule,MatIconModule,RouterModule,MatFormFieldModule,FormsModule,MatOptionModule,MatFormField,MatLabel,MatSelectModule,MatLabel,MatSelect,MatInputModule,MatButtonModule],
  templateUrl: './modifica-club.component.html',
  styleUrl: './modifica-club.component.css',
})
export class ModificaClubComponent implements OnInit,OnDestroy{

  constructor(public u:UserDataService, public fb:FbService, public route:ActivatedRoute, public r:Router){}

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

  id:any = null
  studentiLista:any[] = ['GianfrancoEr Cipolla','GianriccardoEr Cipolla','Giangiacomo Er Cipolla']
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

  ngOnInit(){
    this.route.paramMap.subscribe((p:ParamMap)=>{
      this.id = +p.get('id')!
      this.u.idModifica.classes = +p.get('id')!
      this.u.modificaAttiva.classes = true
    })
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
    this.id = null
    this.u.idModifica.classes = null
    this.u.modificaAttiva.classes = false
  }

  @ViewChild('modifica') formModifica!:NgForm
  modificaElemento(f:NgForm){
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

    this.u.datiUtente['clubs'][this.id] = 
      {
        id:this.id,
          name:f.value.nome,
          place:f.value.luogo,
          schedule:schedule,
          times:times,
          students:f.value.studenti?f.value.studenti:[],
          professors:f.value.professori?f.value.professori:[],
          fullDef:f.value.nome,
          deleting:this.u.datiUtente['clubs'][this.id]['deleting']
      }

    this.u.updateRefOnMod(this.id,'clubs','students')
    this.u.updateRefOnMod(this.id,'clubs','professors')
    this.fb.salvataggio()
    this.u.updateHeader()
    f.reset()
    this.r.navigate(['/clubs/'+this.u.datiUtente['clubs'][this.id]['id']+'/'+this.u.datiUtente['clubs'][this.id]['name']])
  }
}