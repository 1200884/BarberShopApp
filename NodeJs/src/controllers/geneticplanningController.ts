import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IGeneticPlanningController from './IControllers/IGeneticPlanningController';
import IGeneticPlanningService from '../services/IServices/IGeneticPlanningService';
import IGeneticPlanningDTO from '../dto/IGeneticPlanningDTO';

@Service()
export default class GeneticPlanningController implements IGeneticPlanningController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.geneticplanning.name) private geneticplanningServiceInstance : IGeneticPlanningService
  ) {}

  public async getGeneticPlanning(req: Request, res: Response, next: NextFunction) {
    try {
      let geneticplanningOrError = await this.geneticplanningServiceInstance.getGeneticPlanning(req.body as IGeneticPlanningDTO) as Result<String>;
      console.log("req.body is "+req.body )
      if (geneticplanningOrError.isFailure) {
        return res.status(404).send();
      }

      const geneticplanningDTO = geneticplanningOrError.getValue();
      return res.status(201).json( geneticplanningDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}