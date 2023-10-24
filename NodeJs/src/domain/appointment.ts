import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
//import { UserId } from "./userId";
//import { UserEmail } from "./userEmail";
//import { Role } from "../domain/role";
import { Guard } from "../core/logic/Guard";
import { IAppointmentDTO } from "../dto/IAppointmentDTO";


interface AppointmentProps {
  name: string;
  place: string;
  day: string;
  hour: string;
  type: string;
}

export class Appointment extends AggregateRoot<AppointmentProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get name (): string {
    return this.props.name
  }

  get place (): string {
    return this.props.place;
  }

  get day (): string {
    return this.props.day;
  }

  get hour (): string {
    return this.props.hour;
  }

  get type (): string {
    return this.props.type;
  }
  
  set name (value: string) {
    this.props.name = value;
  }

  set place (value: string) {
      this.props.place = value;
  }

  set day (value: string) {
    this.props.day = value;
  }

  set hour (value: string) {
    this.props.hour = value;
  }
  set type (value: string) {
    this.props.type = value;
  }


  

  private constructor (props: AppointmentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (appointmentDTO: IAppointmentDTO, id?: UniqueEntityID): Result<Appointment> {

    const name = appointmentDTO.name;
    const place = appointmentDTO.place;
    const day = appointmentDTO.day;
    const hour = appointmentDTO.hour;
    const type = appointmentDTO.type;
    console.log("type do objeto é "+type)

    /*if (email.length==0) {
      return Result.fail<Appointment>('The email cannot be empty')
    } 
    if (!email.includes('@')) {
      return Result.fail<Appointment>('The email needs to have the @ character')
    }*/
    const appointment = new Appointment({ name: name, place: place, day: day, hour: hour, type: type})
    console.log("appointment djiiddiw"+appointment.type)
    return Result.ok<Appointment>(appointment)
  }

  public static createFromBD(appointmentDTO: IAppointmentDTO, id?: UniqueEntityID): Result<Appointment> {
    const name = appointmentDTO.name;
    console.log(name)
    const place = appointmentDTO.place;
    const day = appointmentDTO.day;
    const hour = appointmentDTO.hour;
    const type = appointmentDTO.type;
      const appointment = new Appointment({ name: name, place: place, day: day, hour: hour, type: type}, id)
      return Result.ok<Appointment>(appointment)  
  }
}