import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../_services/busy.service';
import { delay, finalize, identity } from 'rxjs';
import { environment } from '../../environments/environment';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const BusyServ = inject(BusyService);

  BusyServ.busy()

  return next(req).pipe(
    (environment.production ? identity : delay(1000)),
    finalize(() => {
      BusyServ.idle()
    })
  )
};
