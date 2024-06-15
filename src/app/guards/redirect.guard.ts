import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const redirectGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

  if (localStorage.getItem('token')) {
    router.navigateByUrl('/groupsList')
    return false;
  }
  return true;
};
