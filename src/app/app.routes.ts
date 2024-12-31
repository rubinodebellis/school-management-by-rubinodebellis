import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { compGuard, loginGuard } from './authorizations/log.guard';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ClassiComponent } from './components/classi/classi.component';
import { ClubComponent } from './components/club/club.component';
import { GiteComponent } from './components/gite/gite.component';
import { NonAccessoComponent } from './components/non-accesso/non-accesso.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrganigrammaComponent } from './components/organigramma/organigramma.component';
import { PersonaleComponent } from './components/personale/personale.component';
import { ProfessoriComponent } from './components/professori/professori.component';
import { FiltroComponent } from './components/ricerca/ricerca.component';
import { SpeseComponent } from './components/spese/spese.component';
import { UsciteComponent } from './components/uscite/uscite.component';
import { StudentiComponent } from './components/studenti/studenti.component';
import { InfoComponent } from './components/info/info.component';
import { ProfiloOrganigrammaComponent } from './components/organigramma/profilo-organigramma/profilo-organigramma.component';
import { ModificaOrganigrammaComponent } from './components/organigramma/modifica-organigramma/modifica-organigramma.component';
import { AggiuntaOrganigrammaComponent } from './components/organigramma/aggiunta-organigramma/aggiunta-organigramma.component';
import { AggiuntaProfessoriComponent } from './components/professori/aggiunta-professori/aggiunta-professori.component';
import { ModificaProfessoriComponent } from './components/professori/modifica-professori/modifica-professori.component';
import { ProfiloProfessoriComponent } from './components/professori/profilo-professori/profilo-professori.component';
import { AggiuntaPersonaleComponent } from './components/personale/aggiunta-personale/aggiunta-personale.component';
import { ModificaPersonaleComponent } from './components/personale/modifica-personale/modifica-personale.component';
import { ProfiloPersonaleComponent } from './components/personale/profilo-personale/profilo-personale.component';
import { AggiuntaClassiComponent } from './components/classi/aggiunta-classi/aggiunta-classi.component';
import { ModificaClassiComponent } from './components/classi/modifica-classi/modifica-classi.component';
import { ProfiloClassiComponent } from './components/classi/profilo-classi/profilo-classi.component';
import { AggiuntaStudentiComponent } from './components/studenti/aggiunta-studenti/aggiunta-studenti.component';
import { ModificaStudentiComponent } from './components/studenti/modifica-studenti/modifica-studenti.component';
import { ProfiloStudentiComponent } from './components/studenti/profilo-studenti/profilo-studenti.component';
import { AggiuntaSpeseComponent } from './components/spese/aggiunta-spese/aggiunta-spese.component';
import { ModificaSpeseComponent } from './components/spese/modifica-spese/modifica-spese.component';
import { ProfiloSpeseComponent } from './components/spese/profilo-spese/profilo-spese.component';
import { AggiuntaClubComponent } from './components/club/aggiunta-club/aggiunta-club.component';
import { ModificaClubComponent } from './components/club/modifica-club/modifica-club.component';
import { ProfiloClubComponent } from './components/club/profilo-club/profilo-club.component';
import { AggiuntaUsciteComponent } from './components/uscite/aggiunta-uscite/aggiunta-uscite.component';
import { ModificaUsciteComponent } from './components/uscite/modifica-uscite/modifica-uscite.component';
import { ProfiloUsciteComponent } from './components/uscite/profilo-uscite/profilo-uscite.component';
import { ProfiloGiteComponent } from './components/gite/profilo-gite/profilo-gite.component';
import { AggiuntaGiteComponent } from './components/gite/aggiunta-gite/aggiunta-gite.component';
import { ModificaGiteComponent } from './components/gite/modifica-gite/modifica-gite.component';
import { PresentazioneComponent } from './components/presentazione/presentazione.component';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'/login'},
    {path:'login', component:LoginComponent, canActivate:[loginGuard]},
    {path:'info', component:InfoComponent},
    {path:'signUp', component:SignUpComponent, canActivate:[loginGuard]},
    {path:'classes', component:ClassiComponent, canActivate:[compGuard],canActivateChild:[compGuard],children:[
        {path:':id/:year/:section',component:ProfiloClassiComponent},
        {path:'edit/:id/:year/:section',component:ModificaClassiComponent},
        {path:'addition',component:AggiuntaClassiComponent}
    ]},
    {path:'expenses', component:SpeseComponent, canActivate:[compGuard],canActivateChild:[compGuard],children:[
        {path:':id/:title',component:ProfiloSpeseComponent},
        {path:'edit/:id/:title',component:ModificaSpeseComponent},
        {path:'addition',component:AggiuntaSpeseComponent}
    ]},
    {path:'trips', component:GiteComponent, canActivate:[compGuard],canActivateChild:[compGuard],children:[
        {path:':id',component:ProfiloGiteComponent},
        {path:'edit/:id',component:ModificaGiteComponent},
        {path:'addition/:id',component:AggiuntaGiteComponent}
    ]},
    {path:'flowchart', component:OrganigrammaComponent, canActivate:[compGuard],canActivateChild:[compGuard],children:[
        {path:':id/:name/:surname',component:ProfiloOrganigrammaComponent},
        {path:'edit/:id/:name/:surname',component:ModificaOrganigrammaComponent},
        {path:'addition',component:AggiuntaOrganigrammaComponent}
    ]},
    {path:'staff', component:PersonaleComponent, canActivate:[compGuard],canActivateChild:[compGuard],children:[
        {path:':id/:name/:surname',component:ProfiloPersonaleComponent},
        {path:'edit/:id/:name/:surname',component:ModificaPersonaleComponent},
        {path:'addition',component:AggiuntaPersonaleComponent}
    ]},
    {path:'professors', component:ProfessoriComponent, canActivate:[compGuard],canActivateChild:[compGuard],children:[
        {path:':id/:name/:surname',component:ProfiloProfessoriComponent},
        {path:'edit/:id/:name/:surname',component:ModificaProfessoriComponent},
        {path:'addition',component:AggiuntaProfessoriComponent}
    ]},
    {path:'students', component:StudentiComponent, canActivate:[compGuard],canActivateChild:[compGuard],children:[
        {path:':id/:name/:surname',component:ProfiloStudentiComponent},
        {path:'edit/:id/:name/:surname',component:ModificaStudentiComponent},
        {path:'addition',component:AggiuntaStudentiComponent}
    ]},
    {path:'filter', component:FiltroComponent, canActivate:[compGuard]},
    {path:'outgoings', component:UsciteComponent, canActivate:[compGuard],canActivateChild:[compGuard],children:[
        {path:':id',component:ProfiloUsciteComponent},
        {path:'edit/:id',component:ModificaUsciteComponent},
        {path:'addition/:id',component:AggiuntaUsciteComponent}
    ]},
    {path:'clubs', component:ClubComponent, canActivate:[compGuard],canActivateChild:[compGuard],children:[
        {path:':id/:name',component:ProfiloClubComponent},
        {path:'edit/:id/:name',component:ModificaClubComponent},
        {path:'addition',component:AggiuntaClubComponent}
    ]},
    {path:'notLogged', component:NonAccessoComponent, canActivate:[compGuard]},
    {path:'404',component:NotFoundComponent, canActivate:[compGuard]},
    {path:'**',redirectTo:'/404'}
];
