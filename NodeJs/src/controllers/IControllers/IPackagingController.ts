import { Request, Response, NextFunction } from 'express';

export default interface IPackagingController  {
  createPackaging(req: Request, res: Response, next: NextFunction);
  updatePackaging(req: Request, res: Response, next: NextFunction);
  getPackagings(req: Request, res: Response, next: NextFunction);
  getPackaging(id: string, req: Request, res: Response, next: NextFunction);
  patchPackaging(req: Request, res: Response, next: NextFunction);
}