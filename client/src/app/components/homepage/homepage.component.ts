import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { AccountService } from '../../_services/account.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  registerState = false;

  registerToggle() {
    this.registerState = true;
  }

  cancelRegister(event: boolean) {
    this.registerState = event;
  }
}
