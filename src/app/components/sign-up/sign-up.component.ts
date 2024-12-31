import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LogService } from '../../authorizations/log.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatButtonModule,MatFormFieldModule,FormsModule,RouterModule,MatLabel,MatInputModule ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent{
 
  signUpError: string = ''
  constructor(public log:LogService, public r:Router){}
  

  firebaseConfig = {
    apiKey: "AIzaSyB__KmkigTUnAV8EBIA6r8f005v017zpew",
    authDomain: "schooldb-d4d33.firebaseapp.com",
    databaseURL: "https://schooldb-d4d33-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "schooldb-d4d33",
    storageBucket: "schooldb-d4d33.appspot.com",
    messagingSenderId: "940793615839",
    appId: "1:940793615839:web:34678ac39cff843d5de06a",
    measurementId: "G-TKS551L523"
  }
  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);
  str = `Password must be 8 characters long and must contain at least 
        1 uppercase letter, 1 lowercase letter, 1 figure and one of these characters !+%-_@#$^&*.,? `
  

  signUp(f:NgForm){
        const email = f.value.email
        const password = f.value.password
        createUserWithEmailAndPassword(getAuth(this.app), email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.r.navigate(['/login'])
          f.reset()
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorMessage == "Firebase: Error (auth/invalid-email)"){this.signUpError = "Email does not exist"}
          if(errorMessage == "Firebase: Error (auth/email-already-in-use)."){this.signUpError="Already used email"}
        });
        
  }
}