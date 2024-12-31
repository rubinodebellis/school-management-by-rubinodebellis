import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LogService } from './authorizations/log.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signOut } from 'firebase/auth';
import { UserDataService } from './services/user-data.service';
import { FbService } from './services/fb.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,MatButtonModule, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'schoolManage';
  componenti = ['flowchart','professors','staff','classes','clubs','students','trips','outgoings','expenses','filter']
  cerca = '</>'

  constructor(public log:LogService, public r:Router, public u:UserDataService, public fb:FbService){}

  firebaseConfig = {
    apiKey: "AIzaSyB__KmkigTUnAV8EBIA6r8f005v017zpew",
    authDomain: "schooldb-d4d33.firebaseapp.com",
    databaseURL: "https://schooldb-d4d33-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "schooldb-d4d33",
    storageBucket: "schooldb-d4d33.appspot.com",
    messagingSenderId: "940793615839",
    appId: "1:940793615839:web:34678ac39cff843d5de06a",
    measurementId: "G-TKS551L523"
  };
  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);

  logout(){
    const auth = getAuth();
    signOut(auth).then(() => {
      this.log.utenteAttivo = false
      this.u.idUtente = undefined
      this.u.dbUserEmail = undefined
      this.u.userEmail = undefined
      this.u.datiUtente = {}
      this.u.header = {}
    }).catch((error) => {
    });
    this.log.utenteAttivo = false
    this.r.navigate(['/login'])
  }
}