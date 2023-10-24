import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { Role } from "../domain/role";
import { Guard } from "../core/logic/Guard";
import { IUserDTO } from "../dto/IUserDTO";


interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export class User extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): UserId {
    return UserId.caller(this.id)
  }

  get email (): string {
    return this.props.email;
  }

  get firstName (): string {
    return this.props.firstName
  }

  get lastName (): string {
    return this.props.lastName;
  }

  get phoneNumber (): string {
    return this.props.phoneNumber;
  }

  get role (): string {
    return this.props.role;
  }
  
  set role (value: string) {
      this.props.role = value;
  }

  set firstName (value: string) {
    this.props.firstName = value;
  }

  set lastName (value: string) {
      this.props.lastName = value;
  }

  set phoneNumber (value: string) {
    this.props.phoneNumber = value;
  }

  set email (value: string) {
    this.props.email = value;
  }


  

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (userDTO: IUserDTO, id?: UniqueEntityID): Result<User> {

    const firstName = userDTO.firstName;
    const lastName = userDTO.lastName;
    const email = userDTO.email;
    const phoneNumber = userDTO.phoneNumber;
    const role = userDTO.role;

    if (email.length==0) {
      return Result.fail<User>('The email cannot be empty')
    } 
    if (!email.includes('@')) {
      return Result.fail<User>('The email needs to have the @ character')
    }
    const user = new User({ firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, role: role})
    return Result.ok<User>(user)
  }

  public static createFromBD(userDTO: IUserDTO, id?: UniqueEntityID): Result<User> {
    const firstName = userDTO.firstName;
    console.log(firstName)
    const lastName = userDTO.lastName;
    const email = userDTO.email;
    const phoneNumber = userDTO.phoneNumber;
    const role = userDTO.role;
      const user = new User({ firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, role: role}, id)
      return Result.ok<User>(user)  
  }
}