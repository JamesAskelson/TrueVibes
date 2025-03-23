import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  baseUrl = environment.base;
  private http = inject(HttpClient);
  likeIds = signal<number[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null)

  toggleLike(targetId: number){
    return this.http.post(`${this.baseUrl}likes/${targetId}`, {})
  }

  getLikes(predicate: string, pageNumber:  number, pageSize: number) {
    let params = this.setPaginationHeaders(pageNumber, pageSize)
    params.append('predicate', predicate)

    return this.http.get<Member[]>(`${this.baseUrl}likes?predicate=${predicate}`, {observe: "response", params}).subscribe({
      next: response => {
        this.setPaginatedResponse(response)
      }
    })
  }

  getLikeIds() {
    return this.http.get<number[]>(`${this.baseUrl}likes/list`).subscribe({
      next: ids => this.likeIds.set(ids)
    })
  }


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
}
