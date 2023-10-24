import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IPlanningController from './IControllers/IPlanningController';
import IPlanningService from '../services/IServices/IPlanningService';
import IPlanningDTO from '../dto/IPlanningDTO';

@Service()
export default class PlanningController implements IPlanningController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.planning.name) private planningServiceInstance : IPlanningService
  ) {}

  public async getPlanning(id: string, date: string, req: Request, res: Response, next: NextFunction) {
    try {
      let planningOrError = await this.planningServiceInstance.getPlanning(id, date) as Result<IPlanningDTO>;
      
      if (planningOrError.isFailure) {
        return res.status(404).send();
      }

      const planningDTO = planningOrError.getValue();
      return res.status(201).json( planningDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}