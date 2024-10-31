import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, tap, switchMap } from 'rxjs/operators';
import { UsersData } from '../models/user.model';
import { environment } from '../environments/environment';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

  // Caches
  private usersCache = new Map<number, UsersData>();

  constructor(private http: HttpClient, private liveAnnouncer: LiveAnnouncer) {}

  getUsers(page: number): Observable<UsersData> {

    if (this.usersCache.has(page)) {
      this.liveAnnouncer.announce('Fetching users from cache');
      return of(this.usersCache.get(page) as UsersData); 
    }

    
    return this.http.get<UsersData>(`${this.baseUrl}?page=${page}`).pipe(
      tap(data => {
        this.usersCache.set(page, data); 
        this.liveAnnouncer.announce('Fetching users from API');
      }),
      shareReplay(1) 
    );
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.liveAnnouncer.announce('Fetching user from API');
      }),
      shareReplay(1)
    );
  }
}
