import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { AccountService } from '../../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
    selector: 'app-homepage',
    imports: [RegisterComponent],
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  private accServ = inject(AccountService)
  registerState = false;

  constructor(router: Router){
    if(this.accServ.currUser()) {
      router.navigate(['members'])
    }
  }

  registerToggle() {
    this.registerState = true;
  }

  cancelRegister(event: boolean) {
    this.registerState = event;
  }
}
