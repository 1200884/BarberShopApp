// reservations.component.ts
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
  @ViewChild('calendar') calendarRef!: ElementRef;
  calendar: any;
  appointments: any[] = [];
  selectedAppointment: any; // Variável para rastrear o compromisso selecionado

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
      events: this.appointments.map(appointment => {
        const eventDate = new Date(appointment.day);
        console.log('Nome:', appointment.name, 'Data:', eventDate);
        return {
          date: eventDate,
          appointmentDetails: appointment
        };
      }),
      eventClick: (info) => {
        this.selectedAppointment = info.event.extendedProps.appointmentDetails; // Defina o compromisso selecionado
      }
    });
    this.calendar.render();
  }
}
