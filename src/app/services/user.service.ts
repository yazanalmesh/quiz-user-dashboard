import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsersData, UserDetails } from '../models/user.model';
import { map, tap } from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;
  private usersCache = new Map<number, UsersData>();
  private userDetailCache = new Map<string, UserDetails>();

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<UsersData> {
    if (this.usersCache.has(page)) {
      return of(this.usersCache.get(page) as UsersData);
    }
    return this.http.get<UsersData>(`${this.baseUrl}?page=${page}`).pipe(
      tap(data => this.usersCache.set(page, data))
    );
  }

  getUserById(id: string): Observable<UserDetails> {
    if (this.userDetailCache.has(id)) {
      return of(this.userDetailCache.get(id) as UserDetails);
    }
    return this.http.get<{ data: UserDetails }>(`${this.baseUrl}/${id}`).pipe(
      tap(response => this.userDetailCache.set(id, response.data)),
      map(response => response.data)
    );
  }
}
