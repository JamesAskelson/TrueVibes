import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  accServe = inject(AccountService)
  base = environment.base;

  getMembers() {
    return this.http.get<Member[]>(this.base + 'users', this.getHttpOptions())
  }

  getMemberByName(username: string){
    return this.http.get<Member>(this.base + 'users/' + username, this.getHttpOptions())
  }

  getMemberById(id: number){
    return this.http.get<Member>(this.base + 'user/' + id, this.getHttpOptions())
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accServe.currUser()?.token}`
      })
    }
  }

}
