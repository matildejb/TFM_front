import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if (!localStorage.getItem('token')) {
    router.navigateByUrl('/login?error=1')
    return false;
  }
  return true;
};
