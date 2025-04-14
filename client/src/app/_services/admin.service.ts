import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  base = environment.base;
  private http = inject(HttpClient);

  getUserWithRoles() {
    return this.http.get<User[]>(this.base + 'admin/users-with-roles')
  }
}
