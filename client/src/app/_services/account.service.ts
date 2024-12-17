import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';
import { useAnimation } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  currUser = signal<User | null>(null);
  base = 'https://localhost:5001/api/';

  login(model: any) {
    return this.http.post<User>(this.base + 'account/login', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currUser.set(user);
        }
        return user;
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.base + 'account/register', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currUser.set(user);
        }
        return user;
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currUser.set(null);
  }
}
