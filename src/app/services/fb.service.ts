import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class FbService {
  constructor(public http:HttpClient,public u:UserDataService){}

  dbUrl: string = "https://schooldb-d4d33-default-rtdb.europe-west1.firebasedatabase.app/"
  projectApiKey:string = "AIzaSyB__KmkigTUnAV8EBIA6r8f005v017zpew"
  appId:string = "1:940793615839:web:34678ac39cff843d5de06a"

  selectTabella(tabella:string){
    return this.http.get(this.dbUrl+tabella+'.json')
  }
  inTabella(tabella:string,header:{}){
    return this.http.post(this.dbUrl+tabella+'.json',header)
  }
  putTabella(tabella:string,id:string,body:{}){
    return this.http.put(this.dbUrl+tabella+'/'+id+'.json',body)
  }
  salvataggio(){
    this.putTabella('utenti/'+this.u.dbUserEmail,this.u.idUtente,this.u.datiUtente).subscribe()
  }
}