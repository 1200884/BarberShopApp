import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/User';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  register(user: User | undefined): Observable<User> {
    return this.http.post<User>(environment.LOGISTICS_URL_LOCAL + environment.AUTH_URL+"/signup",user);
  }
  logIn(email: string): Observable<User> {
    return this.http.get<User>(environment.LOGISTICS_URL_LOCAL + environment.AUTH_URL+"/"+email);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.LOGISTICS_URL_LOCAL + environment.AUTH_URL);
  }
  inactive(email: string): Observable<User> {
    return this.http.delete<User>(environment.LOGISTICS_URL_LOCAL + environment.AUTH_URL+"/"+email);
  }
  isClient(email: string): Observable<boolean>{
    return this.http.get<boolean>(environment.LOGISTICS_URL_LOCAL + environment.AUTH_URL+"/isclient/"+email);
  }
  isEmployee(email: string): Observable<boolean>{
    return this.http.get<boolean>(environment.LOGISTICS_URL_LOCAL + environment.AUTH_URL+"/isemployee/"+email);
  }
}
