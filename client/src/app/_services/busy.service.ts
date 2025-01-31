import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequest = 0;
  private spinnerServ = inject(NgxSpinnerService);

  busy() {
    this.busyRequest++;
    this.spinnerServ.show(undefined,
      {
        type: 'ball-atom',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: "#000000",
        size: "large"
      }
    )
  }

  idle() {
    this.busyRequest--;
    if(this.busyRequest <= 0){
      this.busyRequest = 0;
      this.spinnerServ.hide();
    }
  }
}
