import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from './log.service';

export const compGuard: CanActivateFn = (route:any, state:any) => {
  const logged = inject(LogService)
  const router = inject(Router)
  if(logged.utenteAttivo == true){
    return true
  }
  return router.parseUrl('/login');
};

export const loginGuard: CanActivateFn = (route:any, state:any) => {
  const logged = inject(LogService)
  const router = inject(Router)
  if(logged.utenteAttivo == false){
    return true
  }
  return router.parseUrl('/organigramma');
};