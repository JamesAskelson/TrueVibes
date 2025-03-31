import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { PaginatedResult } from '../_models/pagination';
import { Message } from '../_models/message';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  base = environment.base;
  private http = inject(HttpClient);
  paginatedResult = signal<PaginatedResult<Message[]> | null>(null);

  getMessages(pageNumber: number, pageSize: number, container: string){
    let params = this.setPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);

    return this.http.get<Message[]>(this.base + 'messages', {observe: 'response', params})
      .subscribe({
        next: response => {this.setPaginatedResponse(response),
          console.log(response)
        }

      })

  }

getMessageThread(username: string) {
  return this.http.get<Message[]>(this.base + 'messages/thread/' + username)
}

////////////////////////////////////////////////////
// Pagination Functions
////////////////////////////////////////////////////
    private setPaginatedResponse(response: HttpResponse<Message[]>) {
      this.paginatedResult.set({
          items: response.body as Message[],
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
