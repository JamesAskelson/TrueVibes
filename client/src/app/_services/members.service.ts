import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { AccountService } from './account.service';
import { Photo } from '../_models/photo';
import { PhotoEditComponent } from '../components/members/photo-edit/photo-edit.component';
import { Observable, of, tap } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  private accServ = inject(AccountService)
  base = environment.base;
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null)
  memberCache = new Map();
  user = this.accServ.currUser()
  userParams = signal<UserParams>(new UserParams(this.user));

  resetParams() {
    this.userParams.set(new UserParams(this.user))
  }

  getMembers() {
    const res = this.memberCache.get(Object.values(this.userParams()).join('-'))
    if (res) return this.setPaginatedResponse(res);

    let params = this.setPaginationHeaders(this.userParams().pageNumber, this.userParams().pageSize)
    params = params.append('maxAge', this.userParams().maxAge)
    params = params.append('minAge', this.userParams().minAge)
    params = params.append('gender', this.userParams().gender)
    params = params.append('orderBy', this.userParams().orderBy)

    return this.http.get<Member[]>(this.base + 'users', {observe: "response", params}).subscribe({
      next: response => {
        this.setPaginatedResponse(response)
        this.memberCache.set(Object.values(this.userParams()).join('-'), response)
        }
      });
  }

////////////////////////////////////////////////////
// Pagination Functions
////////////////////////////////////////////////////

  private setPaginatedResponse(response: HttpResponse<Member[]>) {
    this.paginatedResult.set({
      items: response.body as Member[],
      pagination: JSON.parse(response.headers.get("Pagination")!),
    })
  }

  private setPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    if(pageNumber && pageSize) {
      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
    }

    return params;
  }

  getMemberByName(username: string) {
    const member: Member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.body), [])
      .find((m: Member) => m.username === username)

    if (member) return of(member);
    return this.http.get<Member>(this.base + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.base + 'users', member).pipe(
    //   tap(() => {
    //     this.members.update(members => members.map(m => m.username === member.username
    //         ? member : m))
    //   })
    )
  }

  setMainPhoto(photo: Photo) {
    return this.http.put(this.base + 'users/set-main-photo/' + photo.id, {}).pipe(
    //   tap(() => {
    //     this.members.update(members => members.map(m => {
    //       if (m.photo.includes(photo)) {
    //         m.photoUrl = photo.url
    //       }
    //       return m;
    //     }))
    //   })
    )
  }

  deletePhoto(photo: Photo) {
    return this.http.delete(this.base + 'users/delete-photo/' + photo.id).pipe(
    //   tap(() => {
    //     this.members.update(members => members.map(m => {
    //       if (m.photo.some(x => x.id === photo.id)) {
    //         m.photo = m.photo.filter(x => x.id !== photo.id);
    //       }
    //       return m;
    //     }));
    //   })
    );
  }

  // members = signal<Member[]>([])

  // getMembers() {
  //   return this.http.get<Member[]>(this.base + 'users').subscribe({
  //     next: members => this.members.set(members)
  //   });
  // }

  // getMember(username: string) {
  //   const member = this.members().find(x => x.username === username);
  //   if (member !== undefined) return of(member);

  //   return this.http.get<Member>(this.baseUrl + 'users/' + username);
  // }

  // updateMember(member: Member) {
  //   return this.http.put(this.base + 'users', member).pipe(
  //     tap(() => {
  //       this.members.update(members => members.map(m => m.username === member.username
  //           ? member : m))
  //     })
  //   )
  // }

  // setMainPhoto(photo: Photo) {
  //   return this.http.put(this.base + 'users/set-main-photo/' + photo.id, {}).pipe(
  //     tap(() => {
  //       this.members.update(members => members.map(m => {
  //         if (m.photo.includes(photo)) {
  //           m.photoUrl = photo.url
  //         }
  //         return m;
  //       }))
  //     })
  //   )
  // }

  // deletePhoto(photo: Photo) {
  //     return this.http.delete(this.base + 'users/delete-photo/' + photo.id).pipe(
  //       tap(() => {
  //         this.members.update(members => members.map(m => {
  //           if (m.photo.some(x => x.id === photo.id)) {
  //             m.photo = m.photo.filter(x => x.id !== photo.id);
  //           }
  //           return m;
  //         }));
  //       })
  //     );
  //   }

  // getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${this.accServe.currUser()?.token}`
  //     })
  //   }
  // }

}
