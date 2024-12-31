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
  selector: 'app-modifica-spese',
  standalone: true,
  imports: [MatIconModule,RouterLink,RouterModule,MatFormFieldModule,FormsModule,MatOptionModule,MatFormField,MatLabel,MatSelectModule,MatLabel,MatSelect,MatInputModule,MatButtonModule],
  templateUrl: './modifica-spese.component.html',
  styleUrl: './modifica-spese.component.css',
})
export class ModificaSpeseComponent implements OnInit,OnDestroy{

  constructor(public u:UserDataService, public fb:FbService, public route:ActivatedRoute, public r:Router){}

  id:any = null
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
      this.u.idModifica.expenses = +p.get('id')!
      this.u.modificaAttiva.expenses = true
    })
  }

  ngOnDestroy(): void {
    this.id = null
    this.u.idModifica.expenses = null
    this.u.modificaAttiva.expenses = false
  }

  @ViewChild('modifica') formModifica!:NgForm
  modificaElemento(f:NgForm){
    let data = new Date(f.value.data.replaceAll('-','/'))
    let meseD = (data.getMonth()+1).toString().length == 1?'0'+(data.getMonth()+1):(data.getMonth()+1)
    let giornoD = (data.getDate()).toString().length == 1?'0'+data.getDate():data.getDate()
    let importo = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: f.value.valuta
    }).format(f.value.importoPagato).replaceAll(',',' ');

    this.u.datiUtente['expenses'][this.id] = 
      {
        id:this.id,
          title:f.value.titolo,
          date: data.getFullYear() + ' - ' + meseD + ' - ' + giornoD,
          paid_amount:importo,
          currency:f.value.valuta,
          paid_amount_num:f.value.importoPagato,
          beneficiary:f.value.beneficiario,
          description:f.value.descrizione,
        deleting:this.u.datiUtente['expenses'][this.id]['deleting']
      }
    this.fb.salvataggio()
    this.u.updateHeader()
    f.reset()
    this.r.navigate(['/expenses/'+this.u.datiUtente['expenses'][this.id]['id']+'/'+this.u.datiUtente['expenses'][this.id]['title']])
  }
}