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
  selector: 'app-aggiunta-spese',
  standalone: true,
  imports: [MatIconModule,MatFormFieldModule,FormsModule,MatOptionModule,MatFormField,MatLabel,MatSelectModule,MatLabel,MatSelect,MatInputModule,MatButtonModule],
  templateUrl: './aggiunta-spese.component.html',
  styleUrl: './aggiunta-spese.component.css',
})
export class AggiuntaSpeseComponent implements OnDestroy,OnInit{
  constructor(public u:UserDataService, public fb:FbService){}

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

  ngOnInit(): void {
    this.u.aggiuntaAttiva.expenses = true
  }
  ngOnDestroy(): void {
    this.u.aggiuntaAttiva.expenses = false
  }

  @ViewChild('aggiunta') formAggiunta!:NgForm
  aggiuntaElemento(f:NgForm){
    let data = new Date(f.value.data.replaceAll('-','/'))
    let meseD = (data.getMonth()+1).toString().length == 1?'0'+(data.getMonth()+1):(data.getMonth()+1)
    let giornoD = (data.getDate()).toString().length == 1?'0'+data.getDate():data.getDate()
    let importo = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: f.value.valuta
    }).format(f.value.importoPagato).replaceAll(',',' ');

    if(this.u.datiUtente.expenses == undefined){
      this.u.datiUtente['expenses'] = [
        {
          id:0,
          title:f.value.titolo,
          date: data.getFullYear() + ' - ' + meseD + ' - ' + giornoD,
          paid_amount:importo,
          currency:f.value.valuta,
          paid_amount_num:f.value.importoPagato,
          beneficiary:f.value.beneficiario,
          description:f.value.descrizione,
          deleting:false
        }
      ]
    }else{
      this.u.datiUtente.expenses.push({
        id:this.u.datiUtente.expenses.length,
        title:f.value.titolo,
        date:data.getFullYear() + ' - ' + meseD + ' - ' + giornoD,
        paid_amount:importo,
        currency:f.value.valuta,
        paid_amount_num:f.value.importoPagato,
        beneficiary:f.value.beneficiario,
        description:f.value.descrizione,
        deleting:false
      })
    }
    this.fb.salvataggio()
    this.u.updateHeader()
    this.u.movePagination('expenses')
    f.reset()
  }
}
