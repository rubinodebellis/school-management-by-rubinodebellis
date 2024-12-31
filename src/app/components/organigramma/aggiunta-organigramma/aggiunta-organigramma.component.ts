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

@Component({
  selector: 'app-aggiunta-organigramma',
  standalone: true,
  imports: [MatIconModule,MatFormFieldModule,FormsModule,MatOptionModule,MatFormField,MatLabel,MatSelectModule,MatLabel,MatSelect,MatInputModule,MatButtonModule],
  templateUrl: './aggiunta-organigramma.component.html',
  styleUrl: './aggiunta-organigramma.component.css',
})
export class AggiuntaOrganigrammaComponent implements OnDestroy,OnInit{
  constructor(public u:UserDataService, public fb:FbService){}


  ruoliLista: string[] = ['Collegiate bodies','Administrative services manager','Counselor','Secretary','Other'];
  lettere="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZY"
  dateInfo:string = `A date can't be earlier than 1970 - 01 - 01
An impossible date will be modified
like in this example: 2024 - 02 - 31 will
be considered as 2024 - 03 - 02`

  ngOnInit(): void {
    this.u.aggiuntaAttiva.flowchart = true
  }
  ngOnDestroy(): void {
    this.u.aggiuntaAttiva.flowchart = false
  }

  @ViewChild('aggiunta') formAggiunta!:NgForm
  aggiuntaElemento(f:NgForm){
    let nascita = new Date(f.value.dataNascita.replaceAll('-','/'))
    let assunzione = new Date(f.value.dataAssunzione.replaceAll('-','/'))
    let meseN = (nascita.getMonth()+1).toString().length == 1?'0'+(nascita.getMonth()+1):(nascita.getMonth()+1)
    let meseA = (assunzione.getMonth()+1).toString().length == 1?'0'+(assunzione.getMonth()+1):(assunzione.getMonth()+1)
    let giornoN = (nascita.getDate()).toString().length == 1?'0'+nascita.getDate():nascita.getDate()
    let giornoA = (assunzione.getDate()).toString().length == 1?'0'+assunzione.getDate():assunzione.getDate()

    if(this.u.datiUtente.flowchart == undefined){
      this.u.datiUtente['flowchart'] = [
        {
          id:0,
          name:f.value.nome,
          surname:f.value.cognome,
          birth_date: nascita.getFullYear() + ' - ' + meseN + ' - ' + giornoN,
          nci:f.value.nci.toUpperCase(),
          birth_city: f.value.cittaNascita,
          birth_state: f.value.statoNascita,
          hire_date:assunzione.getFullYear() + ' - ' + meseA + ' - ' + giornoA,
          office_code: f.value.nUfficio,
          roles:f.value.ruolo,
          deleting:false
        }
      ]
    }else{
      this.u.datiUtente.flowchart.push({
        id:this.u.datiUtente.flowchart.length,
        name:f.value.nome,
        surname:f.value.cognome,
        birth_date: nascita.getFullYear() + ' - ' + meseN + ' - ' + giornoN,
        nci:f.value.nci.toUpperCase(),
        birth_city: f.value.cittaNascita,
        birth_state: f.value.statoNascita,
        hire_date:assunzione.getFullYear() + ' - ' + meseA + ' - ' + giornoA,
        office_code: f.value.nUfficio,
        roles:f.value.ruolo,
        deleting:false
      })
    }
    this.fb.salvataggio()
    this.u.updateHeader()
    this.u.movePagination('flowchart')
    f.reset()
  }
}
