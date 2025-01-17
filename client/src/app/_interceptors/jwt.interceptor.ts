import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../_services/account.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountServ = inject(AccountService);

  if(accountServ.currUser()){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accountServ.currUser()?.token}`
      }
    })
  }

  return next(req);
};
