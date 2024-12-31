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
  selector: 'app-modifica-classi',
  standalone: true,
  imports: [NgxMatSelectSearchModule,MatIconModule,RouterModule,MatFormFieldModule,FormsModule,MatOptionModule,MatFormField,MatLabel,MatSelectModule,MatLabel,MatSelect,MatInputModule,MatButtonModule],
  templateUrl: './modifica-classi.component.html',
  styleUrl: './modifica-classi.component.css',
})
export class ModificaClassiComponent implements OnInit,OnDestroy{

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
    this.u.datiUtente['classes'][this.id] = 
      {
        id:this.id,
        year:f.value.anno,
        section:f.value.sezione,
        students:f.value.studenti?f.value.studenti:[],
        professors:f.value.professori?f.value.professori:[],
        fullDef:f.value.anno+'-'+f.value.sezione,
        deleting:this.u.datiUtente['classes'][this.id]['deleting']
      }

    this.u.updateRefOnMod(this.id,'classes','students')
    this.u.updateRefOnMod(this.id,'classes','professors')
    this.fb.salvataggio()
    this.u.updateHeader()
    f.reset()
    this.r.navigate(['/classes/'+this.u.datiUtente['classes'][this.id]['id']+'/'+this.u.datiUtente['classes'][this.id]['year']+'/'+this.u.datiUtente['classes'][this.id]['section']])
  }
}