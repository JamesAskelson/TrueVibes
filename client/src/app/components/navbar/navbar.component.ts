import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AccountService } from '../../_services/account.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  accServ = inject(AccountService)
  private router = inject(Router);
  private toastr = inject(ToastrService)
  model: any = {};


  constructor(private ref: ChangeDetectorRef) {
    console.log(this.accServ.currUser())
  }

  login() {
    this.accServ.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl("/members")
      },
      error: error => this.toastr.success(error.error)
    })
  }

  logout() {
    this.accServ.logout();
    this.router.navigateByUrl('/')
  }

}
