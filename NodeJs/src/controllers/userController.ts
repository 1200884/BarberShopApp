import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IUserController from './IControllers/IUserController';
import IUserService from '../services/IServices/IUserService';
import { IUserDTO } from '../dto/IUserDTO';
import { Result } from "../core/logic/Result";

@Service()
export default class UserController implements IUserController {
  constructor(
    @Inject(config.services.user.name) private userServiceInstance: IUserService
  ) { }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    console.log("signing up");
    try {
      const userOrError = await this.userServiceInstance.createUser(req.body as IUserDTO) as Result<IUserDTO>;

      if (userOrError.isFailure) {
        return res.status(402).send();
      }

      const userDTO = userOrError.getValue();
      return res.json(userDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  }
  public async signIn(id: string, req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.signIn(id) as Result<IUserDTO>;

      if (userOrError.isFailure) {
        return res.status(404).send();
      }

      const userDTO = userOrError.getValue();
      return res.status(201).json(userDTO);
    }
    catch (e) {
      return next(e);
    }
  }
  public async isClient(email: string, req: Request, res: Response, next: NextFunction) {
    console.log("controller backend");
    try {
      const isClient = await this.userServiceInstance.isClient(email);
  
      if (isClient === null) {
        // Se não encontrar o user, retorne false
        return res.status(200).json(false);
      }
  
      console.log(isClient);
      // Retorna true ou false com base na resposta da função isClient
      return res.status(200).json(isClient);
    } catch (e) {
      return next(e);
    }  
  }
  public async isEmployee(email: string, req: Request, res: Response, next: NextFunction) {
    console.log("controller backend");
    console.log("isemployee controller")
    try {
      const isEmployee = await this.userServiceInstance.isEmployee(email);
  
      if (isEmployee === null) {
        // Se não encontrar o user, retorne false
        return res.status(200).json(false);
      }
  
      console.log(isEmployee);
      // Retorna true ou false com base na resposta da função isClient
      return res.status(200).json(isEmployee);
    } catch (e) {
      return next(e);
    }  
  }
  
  public async disableUser(id: string, req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.disableUser(id) as Result<IUserDTO>;

      if (userOrError.isFailure) {
        return res.status(404).send();
      }

      const userDTO = userOrError.getValue();
      return res.status(200).json(userDTO);
    }
    catch (e) {
      return next(e);
    }
  }

  public async getUsers(req: Request, res: Response, next: NextFunction){
    try {
      console.log("user controller")
      const userOrError = await this.userServiceInstance.getUsers() as Result<IUserDTO[]>;

      if (userOrError.isFailure) {
        return res.status(404).send();
      }

      const userDTO = userOrError.getValue();
      return res.status(200).json(userDTO);
    }
    catch (e) {
      return next(e);
    }
  }
}
