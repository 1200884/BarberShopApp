import { Result } from "../../core/logic/Result";
import { IAppointmentDTO } from "../../dto/IAppointmentDTO";

export default interface IAppointmentService  {
  createAppointment(appointmentDTO: IAppointmentDTO): Promise<Result<IAppointmentDTO>>;
  disableAppointment(place:string, day:string, hour: string, type: string): Promise<Result<IAppointmentDTO>>;
  getAppointments(): Promise<Result<IAppointmentDTO[]>>;
  /*isClient(email:string):Promise<boolean>;
  isEmployee(email:string):Promise<boolean>;*/
}
