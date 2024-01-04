import { Result } from "../../core/logic/Result";
import { IAppointmentDTO } from "../../dto/IAppointmentDTO";

export default interface IAppointmentService  {
  createAppointment(appointmentDTO: IAppointmentDTO): Promise<Result<IAppointmentDTO>>;
  //disableAppointment(place:string, day:string, accountable: string, type: string): Promise<Result<IAppointmentDTO>>;
  getAppointments(): Promise<Result<IAppointmentDTO[]>>;
  getAppointmentsFromPlace(place:string): Promise<Result<IAppointmentDTO[]>>;
  getAppointmentsFromClient(email:string): Promise<Result<IAppointmentDTO[]>>;
  deleteAppointment(day:string, place: string, email:string, accountable:string, type:string): Promise<Boolean>;
  getAppointmentsFromPlaceAndAccountable(place:string, accountable:string): Promise<Result<IAppointmentDTO[]>>;

  /*isClient(email:string):Promise<boolean>;
  isEmployee(email:string):Promise<boolean>;*/
}
