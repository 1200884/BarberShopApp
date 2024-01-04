import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService  {
  createUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
  signIn(email: string): Promise<Result<IUserDTO>>;
  getUser(email: string): Promise<Result<IUserDTO>>;
  disableUser(email: string): Promise<Boolean>;
  getUsers(): Promise<Result<IUserDTO[]>>;
  isClient(email:string):Promise<boolean>;
  isEmployee(email:string):Promise<boolean>;
  addFavorite(favorite: string, email:string):Promise<Boolean>;
  getFavorites(email:string):Promise<string[]>;
  removeFavorite(favorite: string, email:string):Promise<Boolean>;

}
