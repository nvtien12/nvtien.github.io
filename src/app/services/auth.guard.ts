import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const toastr = inject(ToastrService);
  const authServices = inject(AuthService);
  const _route = inject(Router)


  if (authServices.isLoggedInGuard) {
    return true;
  } else {
    toastr.warning("You don't have permission to access this page")
    _route.navigate(['/login'])
    return false;
  }

};
