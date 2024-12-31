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
  selector: 'app-aggiunta-classi',
  standalone: true,
  imports: [MatIconModule,NgxMatSelectSearchModule,MatFormFieldModule,FormsModule,MatOptionModule,MatFormField,MatLabel,MatSelectModule,MatLabel,MatSelect,MatInputModule,MatButtonModule],
  templateUrl: './aggiunta-classi.component.html',
  styleUrl: './aggiunta-classi.component.css',
})
export class AggiuntaClassiComponent implements OnDestroy,OnInit{

  elementiCercati:any[] = []
  mostraDati:number = 1
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
  
  studentiLista:any[] = ['GianfrancoEr Cipolla','GianriccardoEr Cipolla','Giangiacomo Er Cipolla']

  ngOnInit(): void {
    this.u.aggiuntaAttiva.classes = true
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
    this.u.aggiuntaAttiva.classes = false
  }

  selectedOptions:any = {students:[],professors:[]};
  allOptions: any = {students:[],professors:[]};
  filteredOptions: any = this.allOptions;
  filtro:any = {students:"",professors:""}
  onSearchChange(event: Event,k:string) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filtro[k] = filterValue
    this.filteredOptions[k] = this.allOptions[k].filter((option:any) => {
      return option.toLowerCase().includes(filterValue)
    });
  }

  @ViewChild('aggiunta') formAggiunta!:NgForm
  aggiuntaElemento(f:NgForm){
    // this.provaAutocomplete(f)
    if(this.u.datiUtente.classes == undefined){
      this.u.datiUtente['classes'] = [
        {
          id:0,
          year:f.value.anno,
          section:f.value.sezione,
          students:f.value.studenti?f.value.studenti:[],
          professors:f.value.professori?f.value.professori:[],
          fullDef:f.value.anno+'-'+f.value.sezione,
          deleting:false
        }
      ]
    this.u.updateRefOnAdd(f,'professori','classes','professors',true)
    this.u.updateRefOnAdd(f,'studenti','classes','students',true)
    }else{
      this.u.datiUtente.classes.push({
        id:this.u.datiUtente.classes.length,
        year:f.value.anno,
        section:f.value.sezione,
        students:f.value.studenti?f.value.studenti:[],
        professors:f.value.professori?f.value.professori:[],
        fullDef:f.value.anno+'-'+f.value.sezione,
        deleting:false
      })
      this.u.updateRefOnAdd(f,'professori','classes','professors',false)
      this.u.updateRefOnAdd(f,'studenti','classes','students',false)
    }
    console.log(f.value.professori)
    this.fb.salvataggio()
    this.u.updateHeader()
    this.u.movePagination('classes')
    f.reset()
  }
}
