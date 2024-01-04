import { Service, Inject } from 'typedi';
import config from "../../config";
import { IAppointmentDTO } from '../dto/IAppointmentDTO';
import { Appointment } from '../domain/appointment';
import IAppointmentRepo from './IRepos/IAppointmentRepo';
import IAppointmentService from './IServices/IAppointmentService';
import { Result } from "../core/logic/Result";
import { AppointmentMap } from '../mappers/AppointmentMap';
import { forEach } from 'lodash';

@Service()
export default class AppointmentService implements IAppointmentService {
  constructor(
    @Inject(config.repos.appointment.name) private appointmentRepo: IAppointmentRepo,
  ) { }

  public async createAppointment(appointmentDTO: IAppointmentDTO): Promise<Result<IAppointmentDTO>> {
    try {
      console.log("service " + appointmentDTO.type)
      const appointment = await this.appointmentRepo.existsAppointment(appointmentDTO.place, appointmentDTO.day, appointmentDTO.accountable, appointmentDTO.type);
      if (appointment === false) {
        const appointmentOrError = await Appointment.create(appointmentDTO);

        if (appointmentOrError.isFailure) {
          return Result.fail<IAppointmentDTO>(appointmentOrError.errorValue());
        }

        const appointmentResult = appointmentOrError.getValue();
        console.log("antes do save" + appointmentResult.type)
        await this.appointmentRepo.save(appointmentResult);

        const appointmentDTOResult = AppointmentMap.toDTO(appointmentResult) as IAppointmentDTO;
        return Result.ok<IAppointmentDTO>(appointmentDTOResult)
      } else {
        return Result.fail<IAppointmentDTO>("Already exists an Appointment");
      }
    } catch (e) {
      throw e;
    }
  }


  //mudar este metodo para fazer uma query com aqueles parametros (delete where...)

  public async getAppointments(): Promise<Result<IAppointmentDTO[]>> {
    try {
      const appointment = await this.appointmentRepo.findAll();

      if (appointment === null) {
        return Result.fail<IAppointmentDTO[]>("Appointment not found");
      }

      else {
        const appointmentDTOResult = [];
        for (let i = 0; i < appointment.length; i++) {
          const appointments = appointment[i];
          const appointmentDTO = AppointmentMap.toDTO(appointments);
          appointmentDTOResult.push(appointmentDTO);
        }

        return Result.ok(appointmentDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
  public async getAppointmentsFromPlace(place: string): Promise<Result<IAppointmentDTO[]>> {
    try {
      const appointment = await this.appointmentRepo.getAppointmentFromPlace(place);

      if (appointment === null) {
        return Result.fail<IAppointmentDTO[]>("Appointment not found");
      }

      else {
        const appointmentDTOResult = [];
        for (let i = 0; i < appointment.length; i++) {
          const appointments = appointment[i];
          const appointmentDTO = AppointmentMap.toDTO(appointments);
          appointmentDTOResult.push(appointmentDTO);
        }

        return Result.ok(appointmentDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAppointmentsFromClient(email: string): Promise<Result<IAppointmentDTO[]>> {
    try {
      const appointment = await this.appointmentRepo.getAppointmentFromClient(email);

      if (appointment === null) {
        return Result.fail<IAppointmentDTO[]>("Appointment not found");
      }

      else {
        const appointmentDTOResult = [];
        for (let i = 0; i < appointment.length; i++) {
          const appointments = appointment[i];
          const appointmentDTO = AppointmentMap.toDTO(appointments);
          appointmentDTOResult.push(appointmentDTO);
        }

        return Result.ok(appointmentDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAppointmentsFromPlaceAndAccountable(place: string, accountable: string): Promise<Result<IAppointmentDTO[]>> {
    try {
      const appointment = await this.appointmentRepo.getAppointmentFromPlaceAndAccountable(place, accountable);

      if (appointment === null) {
        return Result.fail<IAppointmentDTO[]>("Appointment not found");
      }

      else {
        const appointmentDTOResult = [];
        for (let i = 0; i < appointment.length; i++) {
          const appointments = appointment[i];
          const appointmentDTO = AppointmentMap.toDTO(appointments);
          appointmentDTOResult.push(appointmentDTO);
        }

        return Result.ok(appointmentDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
  
  public async deleteAppointment(day: string, place: string, email: string, accountable: string, type: string): Promise<Boolean> {

    try {
      this.appointmentRepo.deleteAppointment(day, place, email, accountable);

      if (this.appointmentRepo.existsAppointment(place,day, accountable, type)){
        return true;
      }
      else{
        console.log("ja nao existe appointment")
        return false;
      }
    } catch (e) {
      throw e;
    }
  }

}
