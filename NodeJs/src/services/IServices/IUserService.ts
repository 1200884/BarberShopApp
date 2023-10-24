import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService  {
  createUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
  signIn(email: string): Promise<Result<IUserDTO>>;
  disableUser(email: string): Promise<Result<IUserDTO>>;
  getUsers(): Promise<Result<IUserDTO[]>>;
  isClient(email:string):Promise<boolean>;
  isEmployee(email:string):Promise<boolean>;
}
