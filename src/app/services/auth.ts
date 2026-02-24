import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private username = '';
  private password = '';
  private apiUrl = `${environment.apiUrl}/Tasks`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
  const headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(username + ':' + password)
  });

  return this.http.get(this.apiUrl, { headers }).pipe(
    map(() => {
      
      this.username = username;
      this.password = password;

      
      localStorage.setItem('user', username);
      return true;
    }),
    catchError(() => {
      localStorage.removeItem('user');
      return of(false);
    })
  );
}

  logout() {
    localStorage.removeItem('user');
    this.username = '';
    this.password = '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getAuthHeaders(): HttpHeaders {
  return new HttpHeaders({
    'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
  });
}
}