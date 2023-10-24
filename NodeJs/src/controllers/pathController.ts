import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPathController from "./IControllers/IPathController";
import IPathService from '../services/IServices/IPathService';
import IPathDTO from '../dto/IPathDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class PathController implements IPathController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.path.name) private pathServiceInstance : IPathService
  ) {}

  public async createPath(req: Request, res: Response, next: NextFunction) {
  
    try {
      const pathOrError = await this.pathServiceInstance.createPath(req.body as IPathDTO) as Result<IPathDTO>;
        
      if (pathOrError.isFailure) {
        return res.status(402).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.json( pathDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updatePath(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.updatePath(req.body as IPathDTO) as Result<IPathDTO>;

      if (pathOrError.isFailure) {
        return res.status(404).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.status(201).json( pathDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getPaths(req: Request, res: Response, next: NextFunction) {
    try {
      let pathOrError = await this.pathServiceInstance.getPaths() as Result<IPathDTO[]>;

      if (pathOrError.isFailure) {
        return res.status(404).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.status(200).json( pathDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async getPath(id: string, req: Request, res: Response, next: NextFunction) {
    try {
      let pathOrError = await this.pathServiceInstance.getPath(id) as Result<IPathDTO>;
      
      if (pathOrError.isFailure) {
        return res.status(404).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.status(200).json( pathDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async patchPath(req: Request, res: Response, next: NextFunction) {
    try {
      let info = JSON.stringify(req.body);
      console.log(info);
      let pathOrError = await this.pathServiceInstance.patchPath(info) as Result<IPathDTO>;

      if (pathOrError.isFailure) {
        return res.status(404).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.status(201).json( pathDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}