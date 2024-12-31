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
  selector: 'app-modifica-uscite',
  standalone: true,
  imports: [NgxMatSelectSearchModule,MatIconModule,RouterModule,MatFormFieldModule,FormsModule,MatOptionModule,MatFormField,MatLabel,MatSelectModule,MatLabel,MatSelect,MatInputModule,MatButtonModule],
  templateUrl: './modifica-uscite.component.html',
  styleUrl: './modifica-uscite.component.css',
})
export class ModificaUsciteComponent implements OnInit,OnDestroy{

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
  classiLista: string[] = ['1A','2A','3A','1B','2B','3B','1C','2C','3C']
  materieLista:string[] = ["Japanese","Anchient japanese","Japanese literature","Mathematics","Biology","Chemistry", "Geology","Social Studies","English","English literature","Physical Education","Physics","Music","Art","Home Economics","Latin","Latin literature","Moral Education","Information Technology"]
  lettere="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZY"
  dateInfo:string = `A date can't be earlier than 1970 - 01 - 01
An impossible date will be modified
like in this example: 2024 - 02 - 31 will
be considered as 2024 - 03 - 02`
  valute = [
    { code: 'USD', name: 'USA Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'GBP', name: 'British Pound Sterling' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'SEK', name: 'Swedish Krona' },
    { code: 'NZD', name: 'New Zealand Dollar' }
  ];

  ngOnInit(){
    this.route.paramMap.subscribe((p:ParamMap)=>{
      this.id = +p.get('id')!
      this.u.idModifica.outgoings = +p.get('id')!
      this.u.modificaAttiva.outgoings = true
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
    this.u.idModifica.outgoings = null
    this.u.modificaAttiva.outgoings = false
  }

  @ViewChild('modifica') formModifica!:NgForm
  modificaElemento(f:NgForm){
    let inizio = new Date(f.value.giornoInizio.replaceAll('-','/'))
    let fine = new Date(f.value.giornoFine.replaceAll('-','/'))
    let meseI = (inizio.getMonth()+1).toString().length == 1?'0'+(inizio.getMonth()+1):(inizio.getMonth()+1)
    let meseF = (fine.getMonth()+1).toString().length == 1?'0'+(fine.getMonth()+1):(fine.getMonth()+1)
    let giornoI = (inizio.getDate()).toString().length == 1?'0'+inizio.getDate():inizio.getDate()
    let giornoF = (fine.getDate()).toString().length == 1?'0'+fine.getDate():fine.getDate()
    let costoTotale = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: f.value.valuta
    }).format(f.value.costoTotale).replaceAll(',',' ');

    this.u.datiUtente['outgoings'][this.id] = 
      {
        id:this.id,
        title:f.value.titolo,
        start_date:inizio.getFullYear() + ' - ' + meseI + ' - ' + giornoI + ' ' + f.value.oraInizio,
        end_date:fine.getFullYear() + ' - ' + meseF + ' - ' + giornoF + ' ' + f.value.oraFine,
        start_day:inizio.getFullYear() + ' - ' + meseI + ' - ' + giornoI,
        end_day:fine.getFullYear() + ' - ' + meseF + ' - ' + giornoF,
        start_time:f.value.oraInizio,
        end_time:f.value.oraFine,
        accommodation_place:f.value.alloggio,
        transport_company: f.value.dittaTrasporti,
        description: f.value.descrizione,
        professors:f.value.professori?f.value.professori:[],
        students:f.value.studenti? f.value.studenti:[],
        currency:f.value.valuta,
        total_cost_num:f.value.costoTotale,
        total_cost:costoTotale,
        deleting:this.u.datiUtente['outgoings'][this.id]['deleting']
      }

    this.fb.salvataggio()
    this.u.updateHeader()
    f.reset()
    this.r.navigate(['/outgoings/'+this.u.datiUtente['outgoings'][this.id]['id']])
  }
}
