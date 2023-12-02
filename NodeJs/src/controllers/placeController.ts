import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPlaceController from './IControllers/IPlaceController';
import IPlaceService from '../services/IServices/IPlaceService';
import { IPlaceDTO } from '../dto/IPlaceDTO';
import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class PlaceController implements IPlaceController {
  constructor(
    @Inject(config.services.place.name) private placeServiceInstance: IPlaceService
  ) { }
    disablePlace(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error('Method not implemented.');
    }
   

  public async createPlace(req: Request, res: Response, next: NextFunction) {
    console.log("creating Place");
    try {
      const placeOrError = await this.placeServiceInstance.createPlace(req.body as IPlaceDTO) as Result<IPlaceDTO>;

      if (placeOrError.isFailure) {
        return res.status(402).send();
      }

      const placeDTO = placeOrError.getValue();
      return res.json(placeDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  }
  public async existsPlace(address:string , req: Request, res: Response, next: NextFunction) {
    console.log("creating Place");
    try {
      const placeOrError = await this.placeServiceInstance.existsPlace(address) as Result<IPlaceDTO>;

      if (placeOrError.isFailure) {
        return res.status(402).send();
      }

      const placeDTO = placeOrError.getValue();
      return res.json(placeDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  }
  public async getPlaces(req: Request, res: Response, next: NextFunction){
    try {
      console.log("Place controller")
      const placeOrError = await this.placeServiceInstance.getPlaces() as Result<IPlaceDTO[]>;

      if (placeOrError.isFailure) {
        return res.status(404).send();
      }

      const placeDTO = placeOrError.getValue();
      return res.status(200).json(placeDTO);
    }
    catch (e) {
      return next(e);
    }
  }
  public async findBarbeiros(req: Request, res: Response, next: NextFunction){
    try {
      console.log("Place controller")
      const placeOrError = await this.placeServiceInstance.findBarbeiros() as Result<IPlaceDTO[]>;

      if (placeOrError.isFailure) {
        return res.status(404).send();
      }

      const placeDTO = placeOrError.getValue();
      return res.status(200).json(placeDTO);
    }
    catch (e) {
      return next(e);
    }
  }
  public async findEsteticistas(req: Request, res: Response, next: NextFunction){
    try {
      console.log("Place controller")
      const placeOrError = await this.placeServiceInstance.findEsteticistas() as Result<IPlaceDTO[]>;

      if (placeOrError.isFailure) {
        return res.status(404).send();
      }

      const placeDTO = placeOrError.getValue();
      return res.status(200).json(placeDTO);
    }
    catch (e) {
      return next(e);
    }
  }
  public async findCabeleireiros(req: Request, res: Response, next: NextFunction){
    try {
      console.log("Place controller")
      const placeOrError = await this.placeServiceInstance.findCabeleireiros() as Result<IPlaceDTO[]>;

      if (placeOrError.isFailure) {
        return res.status(404).send();
      }

      const placeDTO = placeOrError.getValue();
      return res.status(200).json(placeDTO);
    }
    catch (e) {
      return next(e);
    }
  }
  public async findSolarios(req: Request, res: Response, next: NextFunction){
    try {
      console.log("find solarios  controller")
      const placeOrError = await this.placeServiceInstance.findSolarios() as Result<IPlaceDTO[]>;

      if (placeOrError.isFailure) {
        return res.status(404).send();
      }

      const placeDTO = placeOrError.getValue();
      return res.status(200).json(placeDTO);
    }
    catch (e) {
      return next(e);
    }
  }
  public async getPlace(name:string , req: Request, res: Response, next: NextFunction) {
    console.log("getting specific Place");
    try {
      const placeOrError = await this.placeServiceInstance.getPlace(name) as Result<IPlaceDTO>;

      if (placeOrError.isFailure) {
        return res.status(402).send();
      }

      const placeDTO = placeOrError.getValue();
      return res.json(placeDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  }
}