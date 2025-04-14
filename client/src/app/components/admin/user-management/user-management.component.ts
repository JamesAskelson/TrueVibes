import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../_services/admin.service';
import { User } from '../../../_models/user';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  private adminServ = inject(AdminService);
  users: User[] = []

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminServ.getUserWithRoles().subscribe({
      next: users => this.users = users
    })
  }
}
