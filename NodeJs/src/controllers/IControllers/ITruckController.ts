import { Request, Response, NextFunction } from 'express';

export default interface ITruckController  {
  createTruck(req: Request, res: Response, next: NextFunction);
  updateTruck(req: Request, res: Response, next: NextFunction);

  getTrucks(req: Request, res: Response, next: NextFunction);
  getTruck(id: string, req: Request, res: Response, next: NextFunction);
  getTrucksActivity(activity: boolean, req: Request, res: Response, next: NextFunction);

  patchTruck(req: Request, res: Response, next: NextFunction);
  deleteTruck(id: string, req: Request, res: Response, next: NextFunction);
}