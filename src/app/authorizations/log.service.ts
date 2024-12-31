import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  utenteAttivo:boolean = false
  
  constructor() { }
}
