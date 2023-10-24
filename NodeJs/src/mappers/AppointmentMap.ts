import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IAppointmentDTO} from "../dto/IAppointmentDTO";
import { Document, Model } from 'mongoose';

import { Appointment } from "../domain/appointment";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


import { IAppointmentPersistence } from '../dataschema/IAppointmentPersistence';

export class AppointmentMap extends Mapper<Appointment> {

  public static toDTO( appointment: Appointment): IAppointmentDTO {
    return {
      id: appointment.id.toString(),
      name: appointment.name,
      place: appointment.place,
      day: appointment.day,
      hour: appointment.hour,
      type: appointment.type
    } as IAppointmentDTO;
  }

  public static toDomain (raw: any | Model<IAppointmentPersistence & Document>): Appointment {
    //console.log("todomain")
    //console.log("raw "+raw.name)
    const appointmentOrError = Appointment.createFromBD(raw, new UniqueEntityID(raw.domainId));
    appointmentOrError.isFailure ? console.log(appointmentOrError.error) : '';
    //console.log(appointmentOrError )
    return appointmentOrError.isSuccess ? appointmentOrError.getValue() : null;
  }

  public static toPersistence (appointment: Appointment): any {
    const a = {
      domainId: appointment.id.toString(),
      name: appointment.name,
      hour: appointment.hour,
      day: appointment.day,
      place: appointment.place,
      type: appointment.type,
    }
    return a;
  }
}