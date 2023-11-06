// reservations.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AppointmentService } from '../_services/appointment.service';
import { AuthService } from '../_services/auth.service';

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
  userEmail: string | null;

  constructor(private userService: AuthService,private appointmentService: AppointmentService) {
    this.userEmail = this.userService.getUserEmail();
}

  ngAfterViewInit() {
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.appointments = appointments;
      this.initCalendar();
    });
  }

  initCalendar() {
   
    const filteredAppointments = this.appointments.filter(appointment => {
      if(this.userEmail != null){
      return appointment.hour.trim() === this.userEmail.trim();}
      else{return null}
    });
  
    this.calendar = new Calendar(this.calendarRef.nativeElement, {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      slotDuration: '00:30:00',
      views: {
        timeGrid: {
          allDaySlot: false, // Remova a visualização All Day
        },
      },
      slotMinTime: '08:00:00', // Define o horário mínimo para 8:00
      slotMaxTime: '23:00:00', // Define o horário máximo para 23:00
      slotLabelContent: (arg) => {
        const date = arg.date;
        const hour = date.getHours();
        const minute = date.getMinutes();
        const formattedTime = `${hour}:${minute.toString().padStart(2, '0')}`;
        return formattedTime;
      },
      events: filteredAppointments.map(appointment => {
        const eventDate = new Date(appointment.day);
        const eventEndDate = new Date(appointment.day);
        eventEndDate.setMinutes(eventEndDate.getMinutes() + 30);
        return {
          title: appointment.name,
          start: eventDate,
          end: eventEndDate,
          appointmentDetails: appointment
        };
      }),
      eventClick: (info) => {
        this.selectedAppointment = info.event.extendedProps.appointmentDetails;
      }
    });
  
    this.calendar.render();
  }
  

}
