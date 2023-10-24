import { Request, Response, NextFunction } from 'express';

export default interface IGeneticPlanningController  {
  getGeneticPlanning(req:Request,res:Response,next:NextFunction);
}