import { Repo } from "../../core/infra/Repo";
import { Appointment } from "../../domain/appointment";

export default interface IAppointmentRepo extends Repo<Appointment> {
	save(appointment: Appointment): Promise<Appointment>;
	//findById (id: string): Promise<Appointment>;
	findAll(): Promise<Appointment[]>;
    //findByHour(hour: string): Promise<Appointment[]>
    existsAppointment(place:string, day:string, accountable: string, type: string)
	
}
  