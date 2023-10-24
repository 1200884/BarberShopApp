import { Request, Response, NextFunction } from 'express';

export default interface IPlanningController  {
  getPlanning(id: string, date: string, req: Request, res: Response, next: NextFunction);
}