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
  selector: 'app-modifica-professori',
  standalone: true,
  imports: [MatIconModule,NgxMatSelectSearchModule,RouterModule,MatFormFieldModule,FormsModule,MatOptionModule,MatFormField,MatLabel,MatSelectModule,MatLabel,MatSelect,MatInputModule,MatButtonModule],
  templateUrl: './modifica-professori.component.html',
  styleUrl: './modifica-professori.component.css',
})
export class ModificaProfessoriComponent implements OnInit,OnDestroy{

  constructor(public u:UserDataService, public fb:FbService, public route:ActivatedRoute, public r:Router){}

  id:any = null
  classiLista: string[] = ['1A','2A','3A','1B','2B','3B','1C','2C','3C']
  materieLista:string[] = ["Japanese","Anchient japanese","Japanese literature","Mathematics","Biology","Chemistry", "Geology","Social Studies","English","English literature","Physical Education","Physics","Music","Art","Home Economics","Latin","Latin literature","Moral Education","Information Technology","Club Manager"]
  lettere="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZY"
  dateInfo:string = `A date can't be earlier than 1970 - 01 - 01
An impossible date will be modified
like in this example: 2024 - 02 - 31 will
be considered as 2024 - 03 - 02`

  ngOnInit(){
    this.route.paramMap.subscribe((p:ParamMap)=>{
      this.id = +p.get('id')!
      this.u.idModifica.professors = +p.get('id')!
      this.u.modificaAttiva.professors = true
    })
    if(this.u.header.classes && this.u.header.classes.length > 0){
      this.u.header.classes.forEach((i:any) => {
        this.allOptionsClasses.push(i.year + '-' + i.section)
        this.filteredOptionsClasses = this.allOptionsClasses
      }); 
    }
    if(this.u.header.clubs && this.u.header.clubs.length > 0){
      this.u.header.clubs.forEach((i:any) => {
        this.allOptionsClubs.push(i.name)
        this.filteredOptionsClubs = this.allOptionsClubs
      }); 
    }
  }

  ngOnDestroy(): void {
    this.id = null
    this.u.idModifica.professors = null
    this.u.modificaAttiva.professors = false
  }
  allOptionsClasses:any[] = []
  filteredOptionsClasses:any[] = []
  onSearchChangeClasses(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredOptionsClasses = this.allOptionsClasses.filter((option:any) =>{ 
      return option.toLowerCase().includes(filterValue)}
    );
  }

  allOptionsClubs:any[] = []
  filteredOptionsClubs:any[] = []
  onSearchChangeClubs(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredOptionsClubs = this.allOptionsClubs.filter((option:any) =>{ 
      return option.toLowerCase().includes(filterValue)}
    );
  }
  @ViewChild('modifica') formModifica!:NgForm
  modificaElemento(f:NgForm){
    let nascita = new Date(f.value.dataNascita.replaceAll('-','/'))
    let assunzione = new Date(f.value.dataAssunzione.replaceAll('-','/'))
    let meseN = (nascita.getMonth()+1).toString().length == 1?'0'+(nascita.getMonth()+1):(nascita.getMonth()+1)
    let meseA = (assunzione.getMonth()+1).toString().length == 1?'0'+(assunzione.getMonth()+1):(assunzione.getMonth()+1)
    let giornoN = (nascita.getDate()).toString().length == 1?'0'+nascita.getDate():nascita.getDate()
    let giornoA = (assunzione.getDate()).toString().length == 1?'0'+assunzione.getDate():assunzione.getDate()

    this.u.datiUtente['professors'][this.id] = 
      {
        id:this.id,
        name:f.value.nome,
        surname:f.value.cognome,
        birth_date: nascita.getFullYear() + ' - ' + meseN + ' - ' + giornoN,
        nci:f.value.nci.toUpperCase(),
        birth_city: f.value.cittaNascita,
        birth_state: f.value.statoNascita,
        hire_date:assunzione.getFullYear() + ' - ' + meseA + ' - ' + giornoA,
        office_code: f.value.nUfficio,
        subjects:f.value.materie,
        clubs:f.value.club?f.value.club:[],
        classes:f.value.classi? f.value.classi:[],
        fullDef:f.value.nome+' '+f.value.cognome,
        deleting:this.u.datiUtente['professors'][this.id]['deleting']
      }
    
    this.u.updateRefOnMod(this.id,'professors','classes')
    this.u.updateRefOnMod(this.id,'professors','clubs')
    this.fb.salvataggio()
    this.u.updateHeader()
    f.reset()
    this.r.navigate(['/professors/'+this.u.datiUtente['professors'][this.id]['id']+'/'+this.u.datiUtente['professors'][this.id]['name']+'/'+this.u.datiUtente['professors'][this.id]['surname']])
  }
}
