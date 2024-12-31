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

@Component({
  selector: 'app-modifica-personale',
  standalone: true,
  imports: [MatIconModule,RouterLink,RouterModule,MatFormFieldModule,FormsModule,MatOptionModule,MatFormField,MatLabel,MatSelectModule,MatLabel,MatSelect,MatInputModule,MatButtonModule],
  templateUrl: './modifica-personale.component.html',
  styleUrl: './modifica-personale.component.css',
})
export class ModificaPersonaleComponent implements OnInit,OnDestroy{

  constructor(public u:UserDataService, public fb:FbService, public route:ActivatedRoute, public r:Router){}

  id:any = null
  ruoliLista:string[]= ['Custodian','Cafeteria worker','Nurse','Other']
  lettere="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZY"
  dateInfo:string = `A date can't be earlier than 1970 - 01 - 01
An impossible date will be modified
like in this example: 2024 - 02 - 31 will
be considered as 2024 - 03 - 02`

  ngOnInit(){
    this.route.paramMap.subscribe((p:ParamMap)=>{
      this.id = +p.get('id')!
      this.u.idModifica.staff = +p.get('id')!
      this.u.modificaAttiva.staff = true
    })
  }

  ngOnDestroy(): void {
    this.id = null
    this.u.idModifica.staff = null
    this.u.modificaAttiva.staff = false
  }

  @ViewChild('modifica') formModifica!:NgForm
  modificaElemento(f:NgForm){
    let nascita = new Date(f.value.dataNascita.replaceAll('-','/'))
    let assunzione = new Date(f.value.dataAssunzione.replaceAll('-','/'))
    let meseN = (nascita.getMonth()+1).toString().length == 1?'0'+(nascita.getMonth()+1):(nascita.getMonth()+1)
    let meseA = (assunzione.getMonth()+1).toString().length == 1?'0'+(assunzione.getMonth()+1):(assunzione.getMonth()+1)
    let giornoN = (nascita.getDate()).toString().length == 1?'0'+nascita.getDate():nascita.getDate()
    let giornoA = (assunzione.getDate()).toString().length == 1?'0'+assunzione.getDate():assunzione.getDate()

    this.u.datiUtente['staff'][this.id] = 
      {
        id:this.id,
        name:f.value.nome,
        surname:f.value.cognome,
        birth_date: nascita.getFullYear() + ' - ' + meseN + ' - ' + giornoN,
        nci:f.value.nci.toUpperCase(),
        birth_city: f.value.cittaNascita,
        birth_state: f.value.statoNascita,
        hire_date:assunzione.getFullYear() + ' - ' + meseA + ' - ' + giornoA,
        roles:f.value.ruoli,
        deleting:this.u.datiUtente['staff'][this.id]['deleting']
      }
    this.fb.salvataggio()
    this.u.updateHeader()
    f.reset()
    this.r.navigate(['/staff/'+this.u.datiUtente['staff'][this.id]['id']+'/'+this.u.datiUtente['staff'][this.id]['name']+'/'+this.u.datiUtente['staff'][this.id]['surname']])
  }
}
