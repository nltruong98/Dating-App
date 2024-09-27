import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import {
  setPaginationHeaders,
  setPaginationResponse,
} from './paginationHelpers';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  likeIds = signal<number[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);

  toggleId(targetId: number) {
    return this.http.post(`${this.baseUrl}like/${targetId}`, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = setPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);

    return this.http
      .get<Member[]>(`${this.baseUrl}like`, {
        observe: 'response',
        params,
      })
      .subscribe({
        next: (response) =>
          setPaginationResponse(response, this.paginatedResult),
      });
  }

  getLikeIds() {
    return this.http.get<number[]>(`${this.baseUrl}like/list`).subscribe({
      next: (ids) => this.likeIds.set(ids),
    });
  }
}
