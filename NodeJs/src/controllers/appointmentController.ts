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
}