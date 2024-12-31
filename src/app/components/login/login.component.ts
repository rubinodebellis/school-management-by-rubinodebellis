import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { LogService } from '../../authorizations/log.service';
import { UserDataService } from '../../services/user-data.service';
import { FbService } from '../../services/fb.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, MatLabel,MatButtonModule,MatInputModule, RouterModule],
  providers:[],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginError: string = ''
  a:any = ''
  primoLog:any
  constructor(public log:LogService, public r:Router, public u:UserDataService, public fb:FbService){}
  signIn(f:NgForm){
    const firebaseConfig = {
      apiKey: "AIzaSyB__KmkigTUnAV8EBIA6r8f005v017zpew",
      authDomain: "schooldb-d4d33.firebaseapp.com",
      databaseURL: "https://schooldb-d4d33-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "schooldb-d4d33",
      storageBucket: "schooldb-d4d33.appspot.com",
      messagingSenderId: "940793615839",
      appId: "1:940793615839:web:34678ac39cff843d5de06a",
      measurementId: "G-TKS551L523"
    }
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const email = f.value.email
    const password = f.value.password
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      this.log.utenteAttivo = true
      let last = user.email!.lastIndexOf('.');
      this.u.userEmail = user.email
      this.u.dbUserEmail = user.email!.slice(0,last)+'@'+user.email!.slice(last + 1)
      let dbEmail = user.email!.slice(0,last)+'@'+user.email!.slice(last + 1)
      this.fb.selectTabella('utenti/'+dbEmail).subscribe((data:any) => {  
        if(data == undefined || data == null){
          this.fb.inTabella('utenti/'+dbEmail,{
            flowchart:[],
            classes:[],
            clubs:[],
            trips:[],
            staff:[],
            professors:[],
            expenses:[],
            students:[],
            outgoings:[]
          }).subscribe((data:any)=>{
           this.u.idUtente = Object.values(data)[0]
          })
        this.u.datiUtente = {
          flowchart:[],
          classes:[],
          clubs:[],
          trips:[],
          staff:[],
          professors:[],
          expenses:[],
          students:[],
          outgoings:[]
        }
        this.u.header = {
          flowchart:[],
          classes:[],
          clubs:[],
          trips:[],
          staff:[],
          professors:[],
          expenses:[],
          students:[],
          outgoings:[]
        }
        }else{
          const result = Object.keys(data).map((k:any)=>{return data[k]})
          console.log(result[0])
          this.u.datiUtente = result[0]
          this.u.idUtente = Object.keys(data)[0]
          const chiavi:string[] = ['flowchart','classes','clubs','trips','staff','professors','expenses','students','outgoings']
          chiavi.forEach((k:any)=>{
            this.u.header[k] = this.u.datiUtente[k]? this.u.datiUtente[k].filter((i:any)=>{return i != null && i != undefined}) : []
          })
        }
      })
      this.r.navigate(['/flowchart'])
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorMessage == "Firebase: Error (auth/user-disabled)."){this.loginError = "Disabled user, for information contact debellisrubino099@gmail.com"}
      if(errorMessage == "Firebase: Error (auth/invalid-credential)."){this.loginError = "Invalid credentials"}
    });
  }
}