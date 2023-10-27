import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from 'src/app/_models/Appointment';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(environment.LOGISTICS_URL_LOCAL + environment.APPOINTMENTS_URL);
  }
}
