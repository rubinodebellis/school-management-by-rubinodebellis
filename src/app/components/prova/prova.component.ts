import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prova',
  standalone: true,
  imports: [],
  templateUrl: './prova.component.html',
  styleUrl: './prova.component.css'
})
export class ProvaComponent {

  @Input('id') id:any
  @Input('nome') nome:any
  @Input('cognome') cognome:any
}
