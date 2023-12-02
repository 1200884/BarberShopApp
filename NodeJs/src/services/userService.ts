import { Service, Inject } from 'typedi';
import config from "../../config";
import { IUserDTO } from '../dto/IUserDTO';
import { User } from '../domain/user';
import IUserRepo from './IRepos/IUserRepo';
import IUserService from './IServices/IUserService';
import { Result } from "../core/logic/Result";
import { UserMap } from '../mappers/UserMap';

@Service()
export default class UserService implements IUserService {
  constructor(
    @Inject(config.repos.user.name) private userRepo: IUserRepo,
  ) { }

  public async createUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> {
    console.log("create user service")
    try {

      const user = await this.userRepo.findByEmail(userDTO.email);
      if( user === null){
      const userOrError = await User.create(userDTO);

      if (userOrError.isFailure) {
        return Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      await this.userRepo.save(userResult);

      const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
      return Result.ok<IUserDTO>(userDTOResult)
      }else{
        return Result.fail<IUserDTO>("This email is already registered");
      }
    } catch (e) {
      throw e;
    }
  }

  public async getUsers(): Promise<Result<IUserDTO[]>> {
    try {
      console.log("user service")
      const users = await this.userRepo.findAll();
      var finalusers: Array<IUserDTO> = [];
      if (users === null) {
        return Result.fail<IUserDTO[]>("There was a problem assembling the users");
      }
      else {
        
        for (var i = 0; i<users.length; i++){
          finalusers.push(UserMap.toDTO(users[i]) as IUserDTO);
        }
        return Result.ok<IUserDTO[]>(finalusers)
      }
    } catch (e) {
      throw e;
    }
  }
  public async isClient(email: string): Promise<boolean> {
   return this.userRepo.isClient(email);
  }
  public async isEmployee(email: string): Promise<boolean> {
    console.log("isemployee service")
    return this.userRepo.isEmployee(email);
   }
   
  

  public async signIn(email: string): Promise<Result<IUserDTO>> {
    console.log("sign in service")
    try {
      const user = await this.userRepo.findByEmail(email);

      if (user === null) {
        return Result.fail<IUserDTO>("User not found");
      }
      else {
        const userDTOResult = UserMap.toDTO(user) as IUserDTO;
        return Result.ok<IUserDTO>(userDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async disableUser(email: string): Promise<Boolean> {
    console.log("disableUser Service")
    try {
      const user = await this.userRepo.findByEmail(email);
      console.log("e-mail existe")
      if (user === null) {
        return false;
      }
      else {
       const isUserDeleted = await this.userRepo.disableEmployee(email);
       return isUserDeleted;
      }
    } catch (e) {
      throw e;
    }
  }
  public async addFavorite(favorite: string, email:string): Promise<Boolean> {
    console.log("favorite is" + favorite)

    try {
      const existsfavorite = await this.userRepo.checkFavorite(favorite,email);
      if( existsfavorite === false){
        this.userRepo.addFavorite(favorite,email)
        return await this.userRepo.checkFavorite(favorite,email)
      

      
      }else{
        console.log("existsfavorite= "+existsfavorite)
        return false;}
    } catch (e) {
      throw e;
    }
  }
  
  public async getFavorites(email: string): Promise<string[]> {
     console.log("getfavorites service")
     return this.userRepo.getFavorites(email);
  }
  
  public async removeFavorite(favorite: string, email:string): Promise<Boolean> {
    console.log("favorite to be removed is" + favorite)

    try {
      const existsfavorite = await this.userRepo.checkFavorite(favorite,email);
      if( existsfavorite === true){
        this.userRepo.removeFavorite(favorite,email)
        return await this.userRepo.checkFavorite(favorite,email)
      

      
      }else{
        console.log("existsfavorite= "+existsfavorite)
        return false;}
    } catch (e) {
      throw e;
    }
  }
}
