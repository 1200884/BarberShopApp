import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import ITravelsController from './IControllers/ITravelsController';
import ITravelsDTO from '../dto/ITravelsDTO';
import ITravelsService from '../services/IServices/ITravelsService';

@Service()
export default class TravelsController implements ITravelsController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.travels.name) private travelsServiceInstance: ITravelsService
  ) { }

  public async getAllTravels(req: Request, res: Response, next: NextFunction) {
    try {
      let travelsOrError = await this.travelsServiceInstance.getAllTravels() as Result<ITravelsDTO[]>;

      if(travelsOrError.isFailure) {
        return res.status(404).send();
      }

      const travelsDTO = travelsOrError.getValue();
      return res.status(201).json(travelsDTO);
    }
    catch(e) {
      return next(e);
    }
  }

  public async getTravels(date: string, req: Request, res: Response, next: NextFunction) {
    try {
      let travelsOrError = await this.travelsServiceInstance.getTravels(date) as Result<ITravelsDTO>;

      if (travelsOrError.isFailure) {
        return res.status(404).send();
      }

      const travelsDTO = travelsOrError.getValue();
      return res.status(201).json(travelsDTO);
    }
    catch (e) {
      return next(e);
    }
  };
}