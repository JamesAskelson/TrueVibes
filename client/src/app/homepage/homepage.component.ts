import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { AccountService } from '../_services/account.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  http = inject(HttpClient);
  registerState = false;
  users: any;

  ngOnInit(): void {
    this.getUsers()
  }

  registerToggle() {
    this.registerState = true;
  }

  cancelRegister(event: boolean) {
    this.registerState = event;
  }

  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => {
        this.users = response;
      },
      error: error => console.log(error),
      complete: () => console.log("response", this.users)
    });
  }
}
