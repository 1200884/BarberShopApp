import { Repo } from "../../core/infra/Repo";
import { Appointment } from "../../domain/appointment";

export default interface IAppointmentRepo extends Repo<Appointment> {
	save(appointment: Appointment): Promise<Appointment>;
	//findById (id: string): Promise<Appointment>;
	findAll(): Promise<Appointment[]>;
	//findByHour(hour: string): Promise<Appointment[]>
	existsAppointment(place: string, day: string, accountable: string, type: string);
	getAppointmentFromPlace(place: string);
	getAppointmentFromClient(email: string);
	getAppointmentFromPlaceAndAccountable(place: string, accountable: string);
	deleteAppointment(day: string, place: string, email: string, accountable: string);
}
