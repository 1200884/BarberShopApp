import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPackagingController from "./IControllers/IPackagingController";
import IPackagingService from '../services/IServices/IPackagingService';
import IPackagingDTO from '../dto/IPackagingDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class PackagingController implements IPackagingController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.packaging.name) private packagingServiceInstance : IPackagingService
  ) {}

  public async createPackaging(req: Request, res: Response, next: NextFunction) {
    try {
      const packagingOrError = await this.packagingServiceInstance.createPackaging(req.body as IPackagingDTO) as Result<IPackagingDTO>;
        
      if (packagingOrError.isFailure) {
        return res.status(402).send();
      }

      const packagingDTO = packagingOrError.getValue();
      return res.json( packagingDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updatePackaging(req: Request, res: Response, next: NextFunction) {
    try {
      const packagingOrError = await this.packagingServiceInstance.updatePackaging(req.body as IPackagingDTO) as Result<IPackagingDTO>;

      if (packagingOrError.isFailure) {
        return res.status(404).send();
      }

      const packagingDTO = packagingOrError.getValue();
      return res.status(201).json( packagingDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  //Packagings packagings
  public async getPackagings(req: Request, res: Response, next: NextFunction) {
    try {
      let packagingOrError = await this.packagingServiceInstance.getPackagings() as Result<IPackagingDTO[]>;

      if (packagingOrError.isFailure) {
        return res.status(404).send();
      }

      const packagingDTO = packagingOrError.getValue();
      return res.status(201).json( packagingDTO );
    }
    catch (e) {
      return next(e);
    }
  }
  public async getPackaging(id:string, req: Request, res: Response, next: NextFunction) {
    try {
      let packagingOrError = await this.packagingServiceInstance.getPackaging(id) as Result<IPackagingDTO>;
      /*let id = JSON.stringify(req.body);
      let packagingOrError;
      if (id === "{}" || id.length < 2) {
        packagingOrError = await this.packagingServiceInstance.getPackagings() as Result<IPackagingDTO[]>;
      }else {
        packagingOrError = await this.packagingServiceInstance.getPackaging(id) as Result<IPackagingDTO>;
      }*/
      if (packagingOrError.isFailure) {
        return res.status(404).send();
      }

      const packagingDTO = packagingOrError.getValue();
      return res.status(201).json( packagingDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async patchPackaging(req: Request, res: Response, next: NextFunction) {
    try {
      let info = JSON.stringify(req.body);
      
      let packagingOrError = await this.packagingServiceInstance.patchPackaging(info) as Result<IPackagingDTO>;

      if (packagingOrError.isFailure) {
        return res.status(404).send();
      }

      const packagingDTO = packagingOrError.getValue();
      return res.status(201).json( packagingDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}