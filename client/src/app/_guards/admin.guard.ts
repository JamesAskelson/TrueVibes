import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountServ = inject(AccountService);
  const toastr = inject(ToastrService);

  if(accountServ.roles()?.includes('Admin') || accountServ.roles()?.includes('Moderator')) {
    return true;
  } else {
    toastr.error("you cannot enter this area")
    return false;
  }
}
