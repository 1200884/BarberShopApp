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
  createAppointment(appointment: Appointment): Observable<Appointment> {
    console.log("service creatappointment angular")
    return this.http.post<Appointment>(environment.LOGISTICS_URL_LOCAL + environment.APPOINTMENTS_URL + "/create", appointment);
  }
  getAppointmentsFromPlace(place: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(environment.LOGISTICS_URL_LOCAL + environment.APPOINTMENTS_URL + "/" + place);
  }
  getAppointmentsFromPlaceAndBarber(place: string, accountable: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(environment.LOGISTICS_URL_LOCAL + environment.APPOINTMENTS_URL + "/" + place + "/" + accountable);

  }
}
