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
  private userEmail: string | null = null;

  setUserEmail(email: string) {
    this.userEmail = email;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }
  register(user: User | undefined): Observable<User> {
    return this.http.post<User>(environment.LOGISTICS_URL_LOCAL + environment.AUTH_URL+"/signup",user);
  }
  logIn(email: string): Observable<User> {
    return this.http.get<User>(environment.LOGISTICS_URL_LOCAL + environment.AUTH_URL+"/"+email);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.LOGISTICS_URL_LOCAL + environment.AUTH_URL);
  }
 
  isClient(email: string): Observable<boolean>{
    return this.http.get<boolean>(environment.LOGISTICS_URL_LOCAL + environment.AUTH_URL+"/isclient/"+email);
  }
  isEmployee(email: string): Observable<boolean>{
    return this.http.get<boolean>(environment.LOGISTICS_URL_LOCAL + environment.AUTH_URL+"/isemployee/"+email);
  }
  inactive(email: string): Observable<boolean>{
    console.log("email service: "+email);
    const url = environment.LOGISTICS_URL_LOCAL + environment.AUTH_URL+"/deleteemployee/"+email ;
    console.log("URL da solicitação DELETE: " + url);
    console.log(this.http.get<boolean>(url))
    return this.http.get<boolean>(url);
    
    //http://localhost:2223/api/auth/deleteemployee/jgaspar2002@gmail.com
    //http://localhost:2223/api/auth/deleteemployee/jgaspar2002@gmail.com
  }
}
