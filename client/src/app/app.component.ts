import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccountService } from './_services/account.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [CommonModule, NavbarComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private accountService = inject(AccountService);
  title = 'client';

  ngOnInit(): void {
    this.setCurrUser()
  }

  setCurrUser () {
    const userString = localStorage.getItem('user')
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currUser.set(user);
  }


}
