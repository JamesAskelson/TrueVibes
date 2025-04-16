import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';
import { useAnimation } from '@angular/animations';
import { environment } from '../../environments/environment';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private likeServ = inject(LikesService)
  base = environment.base;
  currUser = signal<User | null>(null);
  roles = computed(() => {
    const user = this.currUser();
    if(user && user.token){
      const role = JSON.parse(atob(user.token.split('.')[1])).role
      return Array.isArray(role) ? role : [role]
    }
    return null;
  })

  login(model: any) {
    return this.http.post<User>(this.base + 'account/login', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user)
        }
        return user;
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.base + 'account/register', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user)
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currUser.set(user);
    this.likeServ.getLikeIds();
  }

  logout() {
    localStorage.removeItem('user');
    this.currUser.set(null);
  }
}
