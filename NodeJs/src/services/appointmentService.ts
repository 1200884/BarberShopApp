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
        console.log("service "+ appointmentDTO.type)
      const appointment = await this.appointmentRepo.existsAppointment(appointmentDTO.place,appointmentDTO.day,appointmentDTO.accountable,appointmentDTO.type);
      if( appointment === false){
      const appointmentOrError = await Appointment.create(appointmentDTO);

      if (appointmentOrError.isFailure) {
        return Result.fail<IAppointmentDTO>(appointmentOrError.errorValue());
      }

      const appointmentResult = appointmentOrError.getValue();
      console.log("antes do save" + appointmentResult.type)
      await this.appointmentRepo.save(appointmentResult);

      const appointmentDTOResult = AppointmentMap.toDTO(appointmentResult) as IAppointmentDTO;
      return Result.ok<IAppointmentDTO>(appointmentDTOResult)
      }else{
        return Result.fail<IAppointmentDTO>("Already exists an Appointment");
      }
    } catch (e) {
      throw e;
    }
  }


  //mudar este metodo para fazer uma query com aqueles parametros (delete where...)
  public async disableAppointment(place:string, day:string, accountable: string, type: string): Promise<Result<IAppointmentDTO>> {
    try {
      const appointment = await this.appointmentRepo.existsAppointment(place, day, accountable, type);

      if (appointment === null) {
        return Result.fail<IAppointmentDTO>("Appointment not found");
      }
      else {
        appointment.name = "Sem Nome";
        appointment.place = "Sem Nome";
        appointment.day = "aaa@aaa.com";
        appointment.accountable = "999999999";
        appointment.type = " no type"
        await this.appointmentRepo.save(appointment);

        const appointmentDTOResult = AppointmentMap.toDTO(appointment) as IAppointmentDTO;
        return Result.ok<IAppointmentDTO>(appointmentDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }
  public async getAppointments(): Promise<Result<IAppointmentDTO[]>> {
      try{
        const appointment= await this.appointmentRepo.findAll();
      
      if (appointment === null) {
        return Result.fail<IAppointmentDTO[]>("Appointment not found");
      }
      
      else{
        const appointmentDTOResult = [];
        for (let i = 0; i < appointment.length; i++) {
            const appointments = appointment[i];
            const appointmentDTO = AppointmentMap.toDTO(appointments);
            appointmentDTOResult.push(appointmentDTO);
        }
        
        return Result.ok(appointmentDTOResult);
      }
    }catch (e) {
        throw e;
      }
  }

}
