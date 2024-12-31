import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { ProvaComponent } from '../prova/prova.component';

@Component({
  selector: 'app-presentazione',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,FormsModule,MatTableModule,MatButtonModule,MatIconModule,ProvaComponent],
  templateUrl: './presentazione.component.html',
  styleUrl: './presentazione.component.css'
})
export class PresentazioneComponent {
  // days = [
  //   {n:'mon',close:false},
  //   {n:'tue',close:false},
  //   {n:'wed',close:false},
  //   {n:'thu',close:false},
  //   {n:'fri',close:false},
  //   {n:'sat',close:false},
  //   {n:'sun',close:false}
  // ]
  // schedule:any = {
  //   mon:'no schedule',
  //   tue:'no schedule',
  //   wed:'no schedule',
  //   thu:'no schedule',
  //   fri:'no schedule',
  //   sat:'no schedule',
  //   sun:'no schedule',
  // }

  // closing(d:number){
  //   this.days[d].close = !this.days[d].close
  // }
  // prova(f:NgForm){
  //   Object.keys(this.schedule).forEach((k:any)=>{
  //     if(f.value['op'+k]){
  //       this.schedule[k] = f.value['op'+k] + ' - ' + f.value['cl'+k]
  //     }else{
  //       this.schedule[k] = 'no schedule'
  //     }
  //   })
  //   Object.keys(this.schedule).forEach((k:any)=>{
  //     console.log(this.schedule[k])
  //   })
  // }

  persone:{id:any,nome:any,cognome:any}[] = []
  nome:any
  cognome:any
  addP(){
    this.persone.push({id:this.persone.length,nome:this.nome,cognome:this.cognome})
  }
}
