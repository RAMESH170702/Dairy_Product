import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registrationEndpoint = 'http://localhost:3001/user';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}

  register(user: { username: string; password: string; email: string }): Observable<any> {
    return this.http.post(this.registrationEndpoint, user);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.registrationEndpoint).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        const isLoggedIn = !!user;
        this.isLoggedInSubject.next(isLoggedIn);
        return isLoggedIn;
      })
    );
  }
  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
  getUsername() {
    return this.usernameSubject.asObservable();
  }
}
