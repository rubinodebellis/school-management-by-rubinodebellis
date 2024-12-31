import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, model, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import { UserDataService } from '../../services/user-data.service';
import {MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-ricerca',
  standalone: true,
  imports: [MatPaginatorModule,MatSort,MatSortModule,MatTableModule,MatCheckboxModule,MatSortModule,MatPaginator,MatAutocompleteModule,MatIconModule,MatFormFieldModule,MatProgressBar,MatIconModule,MatProgressBarModule,NgxMatSelectSearchModule ,FormsModule,MatOptionModule,MatFormField,MatLabel,MatSelectModule,MatLabel,MatSelect,MatInputModule,MatButtonModule],
  templateUrl: './ricerca.component.html',
  styleUrl: './ricerca.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltroComponent implements OnInit,OnDestroy{
  constructor(public u:UserDataService){}

  idArrayKeys:any = {
    classes:[],
    clubs:[],
    professors:[],
    students:[]
  }

  ngOnInit(){
    this.idArrayKeys.classes = []
    this.idArrayKeys.clubs = []
    this.idArrayKeys.professors = []
    this.idArrayKeys.students = []

    if(this.u.header.classes){
    this.u.header.classes.forEach((i:any)=>{
      this.idArrayKeys.classes.push({id:i.id,year:i.year,section:i.section,fullDef:i.year+'-'+i.section})
    })}else{this.idArrayKeys.classes = []}
    if(this.u.header.clubs){
    this.u.header.clubs.forEach((i:any)=>{
      this.idArrayKeys.clubs.push({id:i.id,name:i.name,fullDef:i.name})
    })}else{this.idArrayKeys.clubs = []}
    if(this.u.header.professors){
    this.u.header.professors.forEach((i:any)=>{
      this.idArrayKeys.professors.push({id:i.id,name:i.name,surname:i.surname,fullDef:i.name+' '+i.surname})
    })}else{this.idArrayKeys.professors = []}
    if(this.u.header.students){
    this.u.header.students.forEach((i:any)=>{
      this.idArrayKeys.students.push({id:i.id,name:i.name,surname:i.surname,fullDef:i.name+' '+i.surname})
    })}else{this.idArrayKeys.students = []}
  }
  ngOnDestroy(){
    this.idArrayKeys.classes = []
    this.idArrayKeys.clubs = []
    this.idArrayKeys.professors = []
    this.idArrayKeys.students = []
  }

  regOriginaleDate:string = '(\s*(\d{4}[\s]*-[\s]*[0]*([1-9]|1[0-2])[\s]*-[\s]*[0]*([1-9]|[12][0-9]|3[01])|\d{4}[\s]*-[\s]*[0]*([1-9]|1[0-2])[\s]*-[\s]*[0]*([1-9]|[12][0-9]|3[01])\s+([0-1][0-9]|2[0-3])\s*:\s*[0-5][0-9])\s*;\s*)+'
  regOriginaleOrari:string = '(\s*([0-1][0-9]|2[0-3])\s*:\s*[0-5][0-9]\s*;\s*)+'

  patternDate:string = '\s*(\d{4}[\s]*-[\s]*[0]*([1-9]|1[0-2])[\s]*-[\s]*[0]*([1-9]|[12][0-9]|3[01])|\d{4}[\s]*-[\s]*[0]*([1-9]|1[0-2])[\s]*-[\s]*[0]*([1-9]|[12][0-9]|3[01])\s+([0-1][0-9]|2[0-3])\s*:\s*[0-5][0-9])\s*'
  patternOrari:string = '\s*([0-1][0-9]|2[0-3])\s*:\s*[0-5][0-9]\s*'

  regexDate:string = '(?:'+this.patternDate+'(?:,'+this.patternDate+')*(?:,'+this.patternDate+')?|'+this.patternDate+')'
  regexOrari:string = '(?:'+this.patternOrari+'(?:,'+this.patternOrari+')*(?:,'+this.patternOrari+')?|'+this.patternOrari+')'


  progressMax:number = 120

  step:number = 1

  dateInfo:string = `A date can't be earlier than 1970 - 01 - 01
An impossible date will be modified
like in this example: 2024 - 02 - 31 will
be considered as 2024 - 03 - 02`
  stringArrayInfo:string = `Write an array of strings separated by ";"`
  numArrayInfo:string = `Write an array of numeric values separated by ";", remember to end with";"`
  dateArrayInfo:string = `Write an array of dates (yyyy-mm-dd or yyyy-mm-dd hh:minmin) separated by ";", remember to end with";"`
  timeArrayInfo:string = `Write an array of times (hh:minmin) separted by ";", remember to end with";"`
  ruoliListaOrganigramma: string[] = ['Collegiate bodies','Administrative services manager','Counselor','Secretary','Other'];
  ruoliListaPersonale:string[]= ['Custodian','Cafeteria worker','Nurse','Other']
  materieLista:string[] = ["Japanese","Anchient japanese","Japanese literature","Mathematics","Biology","Chemistry", "Geology","Social Studies","English","English literature","Physical Education","Physics","Music","Art","Home Economics","Latin","Latin literature","Moral Education","Information Technology","Club Manager"]
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  lunghezzaOperatore:any = "=="

  caseInsensitive = true;
  componenti = ['flowchart','professors','staff','classes','clubs','students','trips','outgoings','expenses']
  operatoriComuni:string[] = ['==','!=','>','<','>=','<=']
  operatoriComuniSimboli:any = {
    uguale:'==',
    minore:'<',
    maggiore:'>',
    diverso:'!=',
    minoreUguale:'<=',
    maggioreUguale:'>='
  }
  operatoriTemporali:string[] = ['mese','giorno','anno','ora','minuto']
  operatoriDiStringa:string[] = ['cominciaCon','finisceCon','contiene']
  arrayKeys:string[] = ['array','idArray','idArrayOfStudents']

  struttura:any = {
    flowchart:{
      name:{type:'string',full:'name'},
      surname:{type:'string',full:'surname'},
      birth_date:{type:'date',full:'birth date'},
      birth_state:{type:'string',full:'birth state'},
      birth_city:{type:'string',full:'birth city'},
      nci:{type:'string',full:'identity chart number'},
      hire_date:{type:'date',full:'hire date'},
      office_code:{type:'string',full:'office code'},
      roles:{type:'array',full:'roles'}
    },
    professors:{
      name:{type:'string',full:'name'},
      surname:{type:'string',full:'surname'},
      birth_date:{type:'date',full:'birth date'},
      birth_state:{type:'string',full:'birth state'},
      birth_city:{type:'string',full:'birth city'},
      nci:{type:'string',full:'identity chart number'},
      hire_date:{type:'date',full:'hire date'},
      office_code:{type:'string',full:'office code'},
      subjects:{type:'array',full:'subjects'},
      classes:{type:'idArray',full:'classes'},
      clubs:{type:'idArray',full:'clubs'}
    },
    staff:{
      name:{type:'string',full:'name'},
      surname:{type:'string',full:'surname'},
      birth_date:{type:'date',full:'birth date'},
      birth_state:{type:'string',full:'birth state'},
      birth_city:{type:'string',full:'birth city'},
      nci:{type:'string',full:'identity chart number'},
      hire_date:{type:'date',full:'hire date'},
      roles:{type:'array',full:'roles'}
    },
    classes:{
      year:{type:'number',full:'year'},
      section:{type:'string',full:'section'},
      students:{type:'idArray',full:'students'},
      professors:{type:'idArray',full:'professors'}
    },
    clubs:{
      name:{type:'string',full:'name'},
      place:{type:'string',full:'place'},
      students:{type:'idArray',full:'students'},
      professors:{type:'idArray',full:'professors'}
    },
    students:{
      name:{type:'string',full:'name'},
      surname:{type:'string',full:'surname'},
      birth_date:{type:'date',full:'birth date'},
      birth_state:{type:'string',full:'birth state'},
      birth_city:{type:'string',full:'birth city'},
      nci:{type:'string',full:'identity chart number'},
      subscribe_date:{type:'date',full:'subscribe date'},
      classes:{type:'idArrayOfStudents',full:'class'},
      assignedClass:{type:'string',full:'assigned class'},
      clubs:{type:'idArray',full:'clubs'},
    },
    trips:{
      title:{type:'string',full:'title'},
      start_date:{type:'date',full:'start date'},
      end_date:{type:'date',full:'end date'},
      start_day:{type:'date',full:'start day'},
      end_day:{type:'date',full:'start day'},
      start_time:{type:'time',full:'start time'},
      end_time:{type:'time',full:'end time'},
      accommodation_place:{type:'string',full:'accommodation place'},
      transport_company: {type:'string',full:'transport company'},
      schedule: {type:'string',full:'schedule'},
      currency:{type:'string',full:'currency'},
      total_cost_num:{type:'number',full:'total cost (without currency)'},
      total_cost:{type:'string',full:'total cost'},
      professors:{type:'idArray',full:'professors'},
      students:{type:'idArray',full:'students'}
    },
    outgoings:{
      title:{type:'string',full:'title'},
      start_date:{type:'date',full:'start date'},
      end_date:{type:'date',full:'end date'},
      start_day:{type:'date',full:'start day'},
      end_day:{type:'date',full:'end day'},
      start_time:{type:'time',full:'start time'},
      end_time:{type:'time',full:'end time'},
      accommodation_place:{type:'string',full:'accommodation place'},
      transport_company: {type:'string',full:'transport company'},
      description: {type:'string',full:'description'},
      currency:{type:'string',full:'currency'},
      total_cost_num:{type:'number',full:'total cost (without currency)'},
      total_cost:{type:'string',full:'total cost'},
      professors:{type:'idArray',full:'professors'},
      students:{type:'idArray',full:'students'}
    },
    expenses:{
      title:{type:'string',full:'title'},
      date:{type:'date',full:'date'},
      description: {type:'string',full:'description'},
      beneficiary: {type:'string',full:'beneficiary'},
      currency:{type:'string',full:'currency'},
      paid_amount_num:{type:'number',full:'paid amount (without currency)'},
      paid_amount:{type:'string',full:'paid amount'}
    }
  }

  sezione:string = ''
  campi:any[] = []

  condizione:any = {
    campo:null,
    operatore:null,
    richiesta:null
  }
  modCondition(condStep:string){
    if(condStep === 'campo'){
      this.condizione.operatore = null
      this.condizione.richiesta = null
    }else if(condStep === 'operatore'){
      this.condizione.richiesta = null
    }
  }
  strutturaDatiCercati:any = []
  displayedColumns:any = []
  datiCercati:any
  mostraDati:boolean = false
  filteringResult:MatTableDataSource<any> = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  m(){}

  moving(stepTarget:number){
    this.step = stepTarget
    if(stepTarget < 2){
      this.campi = []
    }
    if(stepTarget < 3){
      this.mostraDati = false
      this.condizione.campo = null
      this.condizione.operatore = null
      this.condizione.richiesta = null
    }
    if(stepTarget === 3){
      this.strutturaDatiCercati = []
      this.campi.forEach((c:any)=>{
        this.strutturaDatiCercati.push({codeName:c,fullName:this.struttura[this.sezione][c].full,type:this.struttura[this.sezione][c].type})
      })
    }
  }

  filtering():any{
    this.mostraDati = true
    if(this.operatoriDiStringa.includes(this.condizione.operatore)){
      switch(this.condizione.operatore){
        case 'cominciaCon':
          this.datiCercati = this.caseInsensitive? this.u.header[this.sezione].filter((item:any)=>{return item[this.condizione.campo].toLowerCase().startsWith(this.condizione.richiesta.toLowerCase())}):this.u.header[this.sezione].filter((item:any)=>{return item[this.condizione.campo].startsWith(this.condizione.richiesta)})
        break;
        case 'finisceCon':
        this.datiCercati = this.caseInsensitive? this.u.header[this.sezione].filter((item:any)=>{return item[this.condizione.campo].toLowerCase().endsWith(this.condizione.richiesta.toLowerCase())}):this.u.header[this.sezione].filter((item:any)=>{return item[this.condizione.campo].endsWith(this.condizione.richiesta)})
        break;
        case 'contiene':
          this.datiCercati = this.caseInsensitive? this.u.header[this.sezione].filter((item:any)=>{return item[this.condizione.campo].toLowerCase().includes(this.condizione.richiesta.toLowerCase())}):this.u.header[this.sezione].filter((item:any)=>{return item[this.condizione.campo].includes(this.condizione.richiesta)}) 
        break;
      }  
    }else if(this.operatoriComuni.includes(this.condizione.operatore)){
      if(this.struttura[this.sezione][this.condizione.campo]['type'] == 'string'){
        this.datiCercati = this.caseInsensitive? this.u.header[this.sezione].filter((item:any)=>{return eval("item[this.condizione.campo].toLowerCase() "+this.condizione.operatore+" this.condizione.richiesta.toLowerCase()")}):this.u.header[this.sezione].filter((item:any)=>{return eval("item[this.condizione.campo] "+this.condizione.operatore+" this.condizione.richiesta")})
      }else if(this.struttura[this.sezione][this.condizione.campo]['type'] == 'date' || this.struttura[this.sezione][this.condizione.campo]['type'] == 'time'){
        switch(this.struttura[this.sezione][this.condizione.campo]['type']){
          case 'date':
            this.datiCercati = this.u.header[this.sezione].filter((item:any)=>{return eval("Number(new Date(item[this.condizione.campo].replaceAll('-','/').replaceAll(/\s*:\s*/g,':'))) "+this.condizione.operatore+" Number(new Date(this.condizione.richiesta.replaceAll('-','/').replaceAll(/\s*:\s*/g,':')))")}) 
          break;
          case 'time':
            this.datiCercati = this.u.header[this.sezione].filter((item:any)=>{return eval("Number(new Date('1970/1/1'+item[this.condizione.campo].replaceAll(/\s*:\s*/g,':'))) "+this.condizione.operatore+" Number(new Date('1970/1/1'+this.condizione.richiesta))")}) 
          break;
        }
      }else if(this.struttura[this.sezione][this.condizione.campo]['type'] == 'array' || this.struttura[this.sezione][this.condizione.campo]['type'] == "idArray" || this.struttura[this.sezione][this.condizione.campo]['type'] == 'idArrayOfStudents'){
        switch(this.condizione.operatore){
          case 'uguale':
            this.datiCercati = this.u.header[this.sezione].filter((item:any)=>{return item[this.condizione.campo]? JSON.stringify(item[this.condizione.campo].sort()) === JSON.stringify(this.condizione.richiesta.sort()) : undefined === JSON.stringify(this.condizione.richiesta.sort())})
          break;
          case 'diverso': 
          this.datiCercati = this.u.header[this.sezione].filter((item:any)=>{return JSON.stringify(item[this.condizione.campo].sort()) !== JSON.stringify(this.condizione.richiesta.sort())})
          break;
        }
      }else{
        this.datiCercati = this.u.header[this.sezione].filter((item:any)=>{return eval("item[this.condizione.campo] "+this.condizione.operatore+" this.condizione.richiesta")})
      }
    }else if(this.operatoriTemporali.includes(this.condizione.operatore)){
      if(['anno','mese','giorno'].includes(this.condizione.operatore)){
        switch(this.condizione.operatore){
          case 'anno': 
            this.datiCercati= this.u.header[this.sezione].filter((item:any)=>{return new Date(item[this.condizione.campo].replaceAll('-','/').replaceAll(/\s*:\s*/g,':')).getFullYear() == this.condizione.richiesta})
          break;
          case 'mese': 
            this.datiCercati= this.u.header[this.sezione].filter((item:any)=>{return new Date(item[this.condizione.campo].replaceAll('-','/').replaceAll(/\s*:\s*/g,':')).getMonth() == this.condizione.richiesta})
          break;
          case 'giorno':
            this.datiCercati= this.u.header[this.sezione].filter((item:any)=>{return new Date(item[this.condizione.campo].replaceAll('-','/').replaceAll(/\s*:\s*/g,':')).getDate() == this.condizione.richiesta}) 
          break;
        }
      }else if(['ora','minuto'].includes(this.condizione.operatore)){
        switch(this.struttura[this.sezione][this.condizione.campo]['type']){
          case 'date':
            switch(this.condizione.operatore){
              case 'ora':
                this.datiCercati= this.u.header[this.sezione].filter((item:any)=>{return new Date(item[this.condizione.campo].replaceAll('-','/').replaceAll(/\s*:\s*/g,':')).getHours() == this.condizione.richiesta}) 
              break;
              case 'minuto':
                this.datiCercati= this.u.header[this.sezione].filter((item:any)=>{return new Date(item[this.condizione.campo].replaceAll('-','/').replaceAll(/\s*:\s*/g,':')).getMinutes() == this.condizione.richiesta})
              break;
            }
          break;
          case 'time':
            switch(this.condizione.operatore){
              case 'ora':
                this.datiCercati= this.u.header[this.sezione].filter((item:any)=>{return new Date('1970/1/1 '+item[this.condizione.campo].replaceAll(/\s*:\s*/g,':')).getHours() == this.condizione.richiesta}) 

                break;
              case 'minuto':
                this.datiCercati= this.u.header[this.sezione].filter((item:any)=>{return new Date('1970/1/1 '+item[this.condizione.campo].replaceAll(/\s*:\s*/g,':')).getMinutes() == this.condizione.richiesta}) 
              break;
            }
          break;
        }
      }
    }else if(this.condizione.operatore == 'lunghezza'){
      this.datiCercati = this.u.header[this.sezione].filter((item:any)=>{return eval("item[this.condizione.campo]?item[this.condizione.campo].length "+this.lunghezzaOperatore+" this.condizione.richiesta : 0 "+this.lunghezzaOperatore+" this.condizione.richiesta")})
    }else if(this.condizione.operatore == 'include'){
      this.datiCercati = this.u.header[this.sezione].filter((item:any)=>{return this.condizione.richiesta.some((elem:any)=>{return item[this.condizione.campo] && item[this.condizione.campo].length > 0?item[this.condizione.campo].includes(elem):false})})
    }else if(this.condizione.operatore == 'in'){
      switch(this.struttura[this.sezione][this.condizione.campo]['type']){
        case 'number':
          let arrayOfNumbers:any = this.condizione.richiesta.replaceAll(/\s*;\s*/g,';').split(';').filter((i:any)=>{return i != ""}).map((i:any)=>{return Number(i)})
          this.datiCercati = this.u.header[this.sezione].filter((item:any)=>{return arrayOfNumbers.includes(item[this.condizione.campo])})
          break;
        case 'string':
          this.datiCercati = this.caseInsensitive? this.u.header[this.sezione].filter((item:any)=>{return this.condizione.richiesta.toLowerCase().replaceAll(/\s*;\s*/g,';').split(';').includes(item[this.condizione.campo].toLowerCase())}) : this.u.header[this.sezione].filter((item:any)=>{return this.condizione.richiesta.replaceAll(/\s*;\s*/g,';').split(';').includes(item[this.condizione.campo])}) 
        break;
        case 'date': 
          let arrayOfDates:any = this.condizione.richiesta.replaceAll(/\s*;\s*/g,';').split(';').map((i:any)=>{return Number(new Date(i.replaceAll('-','/').replaceAll(/\s*:\s*/g,':')))})
          this.datiCercati = this.u.header[this.sezione].filter((item:any)=>{return arrayOfDates.includes(Number(new Date(item[this.condizione.campo].replaceAll('-','/').replaceAll(/\s*:\s*/g,':'))))})
        break;
        case 'time':
          let arrayOfTimes:any = this.condizione.richiesta.replaceAll(/\s*;\s*/g,';').split(';').map((i:any)=>{return Number(new Date('1970/1/1 '+i.replaceAll(/\s*:\s*/g,':')))})
          this.datiCercati = this.u.header[this.sezione].filter((item:any)=>{return arrayOfTimes.includes(Number(new Date('1970/1/1 '+item[this.condizione.campo].replaceAll(/\s*:\s*/g,':'))))})
        break;
        case 'idArrayOfStudents':
          this.datiCercati = this.u.header['students'].filter((item:any)=>{return item['classes'] && item['classes'].length > 0? this.condizione.richiesta.includes(item['classes'][0]):this.condizione.richiesta.includes(undefined)})
        break;
      }
    }

    this.filteringResult = new MatTableDataSource()
    this.filteringResult.data = this.datiCercati
    this.filteringResult.sort = this.sort
    this.filteringResult.paginator = this.paginator
    this.displayedColumns = this.campi
    console.log('dati cercati')
    console.log(this.datiCercati)
    console.log('filtering result')
    console.log(this.filteringResult)
    console.log('displayed columns')
    console.log(this.displayedColumns)
    console.log('mat paginator options')
    console.log(this.matPaginatorOptions())
  }

  findKey(obj:any, v:any) {
    return Object.keys(obj).find((key:any) => {return obj[key] === v});
  }

  sortAndPaginatorDef(){
    this.filteringResult.sort = this.sort
    this.filteringResult.paginator = this.paginator
  }

  objectMap(obj:any){
    return Object.keys(obj).map((k:any)=>{return obj[k]})
  }

  objectKeys(obj:{}):string[]{
    return Object.keys(obj)
  }

  number(param:any){
    return Number(param)
  }

  jsonStrFy(param:any){
    return JSON.stringify(param)
  }

  matPaginatorOptions(){
    let numArray = []
    for(let i = 1;i <= 20; i++){
      numArray.push(i*5)
    }
    return numArray
  }

  catchHeaderElementByKey(section:string,key:string,value:any){
    return this.u.header[section].filter((item:any)=>{return item[key] == value})[0]
  }
}