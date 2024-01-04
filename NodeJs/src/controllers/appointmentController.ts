import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IAppointmentController from './IControllers/IAppointmentController';
import IAppointmentService from '../services/IServices/IAppointmentService';
import { IAppointmentDTO } from '../dto/IAppointmentDTO';
import { Result } from "../core/logic/Result";

@Service()
export default class AppointmentController implements IAppointmentController {
  constructor(
    @Inject(config.services.appointment.name) private appointmentServiceInstance: IAppointmentService
  ) { }

  public async createAppointment(req: Request, res: Response, next: NextFunction) {
    console.log("creating appointment");
    try {
      const appointmentOrError = await this.appointmentServiceInstance.createAppointment(req.body as IAppointmentDTO) as Result<IAppointmentDTO>;

      if (appointmentOrError.isFailure) {
        return res.status(402).send();
      }

      const appointmentDTO = appointmentOrError.getValue();
      return res.json(appointmentDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  }
  public async getAppointments(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Appointment controller")
      const appointmentOrError = await this.appointmentServiceInstance.getAppointments() as Result<IAppointmentDTO[]>;

      if (appointmentOrError.isFailure) {
        return res.status(404).send();
      }

      const appointmentDTO = appointmentOrError.getValue();
      return res.status(200).json(appointmentDTO);
    }
    catch (e) {
      return next(e);
    }
  }
  public async getAppointmentsFromPlace(place: string, req: Request, res: Response, next: NextFunction) {
    try {
      console.log("AppointmentFromPlace controller")
      const appointmentOrError = await this.appointmentServiceInstance.getAppointmentsFromPlace(place) as Result<IAppointmentDTO[]>;

      if (appointmentOrError.isFailure) {
        return res.status(404).send();
      }

      const appointmentDTO = appointmentOrError.getValue();
      return res.status(200).json(appointmentDTO);
    }
    catch (e) {
      return next(e);
    }
  }

  public async getAppointmentsFromUser(email: string, req: Request, res: Response, next: NextFunction) {
    try {
      console.log("AppointmentFromClient controller")
      const appointmentOrError = await this.appointmentServiceInstance.getAppointmentsFromClient(email) as Result<IAppointmentDTO[]>;

      if (appointmentOrError.isFailure) {
        return res.status(404).send();
      }

      const appointmentDTO = appointmentOrError.getValue();
      return res.status(200).json(appointmentDTO);
    }
    catch (e) {
      return next(e);
    }
  }

  public async getAppointmentsFromPlaceAndAccountable(place: string, accountable: string, req: Request, res: Response, next: NextFunction) {
    try {
      console.log("AppointmentFromPlace controller")
      const appointmentOrError = await this.appointmentServiceInstance.getAppointmentsFromPlaceAndAccountable(place, accountable) as Result<IAppointmentDTO[]>;

      if (appointmentOrError.isFailure) {
        return res.status(404).send();
      }

      const appointmentDTO = appointmentOrError.getValue();
      return res.status(200).json(appointmentDTO);
    }
    catch (e) {
      return next(e);
    }
  }

  public async deleteAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("delete appointment controller")
      const appointmentOrError = await this.appointmentServiceInstance.deleteAppointment(req.body.day, req.body.place, req.body.email, req.body.accountable, req.body.type) as Boolean;

      if (appointmentOrError==null) {
        return res.status(402).send();
      }
      console.log("fernando")
      return res.json(appointmentOrError).status(201);
    }
    catch (e) {
      return next(e);
    }
  }
}