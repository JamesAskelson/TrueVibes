import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { AccountService } from './account.service';
import { Photo } from '../_models/photo';
import { PhotoEditComponent } from '../components/members/photo-edit/photo-edit.component';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  base = environment.base;
  members = signal<Member[]>([])

  getMembers() {
    return this.http.get<Member[]>(this.base + 'users').subscribe({
      next: members => this.members.set(members)
    });
  }

  getMemberByName(username: string) {
    const member = this.members().find(x => x.username === username);
    if (member !== undefined) return of(member);

    return this.http.get<Member>(this.base + 'users/' + username);
  }

  getMemberById(id: number){
    return this.http.get<Member>(this.base + 'user/' + id)
  }

  updateMember(member: Member) {
    return this.http.put(this.base + 'users', member).pipe(
      tap(() => {
        this.members.update(members => members.map(m => m.username === member.username
            ? member : m))
      })
    )
  }

  setMainPhoto(photo: Photo) {
    return this.http.put(this.base + 'users/set-main-photo/' + photo.id, {}).pipe(
      tap(() => {
        this.members.update(members => members.map(m => {
          if (m.photo.includes(photo)) {
            m.photoUrl = photo.url
          }
          return m;
        }))
      })
    )
  }

  deletePhoto(photo: Photo) {
    return this.http.delete(this.base + 'users/delete-photo/' + photo.id)
    // .pipe(
    //   tap(() => {
    //     this.members.update(members => members.map(m => {
    //       if (m.photo.includes(photo)) {
    //         m.photo = m.photo.filter(x => x.id == photo.id)
    //       }
    //       return m;
    //     }))
    //   })
    // )
  }

  // getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${this.accServe.currUser()?.token}`
  //     })
  //   }
  // }

}
