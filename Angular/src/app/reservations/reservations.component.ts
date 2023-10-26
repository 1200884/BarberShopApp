import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AppointmentService } from '../_services/appointment.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements AfterViewInit {
  @ViewChild('calendar') calendarRef!: ElementRef; // Use "!" para indicar inicialização segura
  calendar: any;
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngAfterViewInit() {
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.appointments = appointments;
      this.initCalendar();
    });
  }

  initCalendar() {
    this.calendar = new Calendar(this.calendarRef.nativeElement, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: this.appointments.map(appointment => ({
        title: appointment.title,
        start: appointment.start // ou outra propriedade da sua resposta do serviço
      }))
    });
    this.calendar.render();
  }
}
