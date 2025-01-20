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
    return this.http.get<Member[]>(this.base + 'users')
  }

  getMemberByName(username: string){
    return this.http.get<Member>(this.base + 'users/' + username)
  }

  getMemberById(id: number){
    return this.http.get<Member>(this.base + 'user/' + id)
  }

  updateMember(member: Member){
    return this.http.put<Member>(this.base + 'users', member)
  }

  // getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${this.accServe.currUser()?.token}`
  //     })
  //   }
  // }

}
