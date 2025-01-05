import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accServ = inject(AccountService);
  const toastr = inject(ToastrService);
  if(accServ.currUser()){
    return true
  } else {
    toastr.error('Unauthorized User')
    return false
  }
};
