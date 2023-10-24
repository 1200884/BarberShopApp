import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITruckController from "./IControllers/ITruckController";
import ITruckService from '../services/IServices/ITruckService';
import ITruckDTO from '../dto/ITruckDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class TruckController implements ITruckController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.truck.name) private truckServiceInstance : ITruckService
  ) {}

  public async createTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.createTruck(req.body as ITruckDTO) as Result<ITruckDTO>;
        
      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.json( truckDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.updateTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(201).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getTrucks(req: Request, res: Response, next: NextFunction) {
    try {
      let truckOrError = await this.truckServiceInstance.getTrucks() as Result<ITruckDTO[]>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(200).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async getTrucksActivity(activity: boolean, req: Request, res: Response, next: NextFunction) {
    try {
      let truckOrError = await this.truckServiceInstance.getTrucksActivity(activity) as Result<ITruckDTO[]>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(200).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async getTruck(id: string, req: Request, res: Response, next: NextFunction) {
    try {
      let truckOrError = await this.truckServiceInstance.getTruck(id) as Result<ITruckDTO>;
      
      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(200).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async deleteTruck(id: string, req: Request, res: Response, next: NextFunction) {
    try {
      let truckOrError = await this.truckServiceInstance.deleteTruck(id) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(200).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async patchTruck(req: Request, res: Response, next: NextFunction) {
    console.log("entrou no patch?");
    try {
      let truckOrError = await this.truckServiceInstance.patchTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      console.log(truckDTO);
      return res.status(201).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}