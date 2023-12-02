import { Request, Response, NextFunction } from 'express';

export default interface IPlaceController {
    createPlace(req: Request, res: Response, next: NextFunction);
    //signIn(id: string, req: Request, res: Response, next: NextFunction);
    getPlaces(req: Request, res: Response, next: NextFunction);
    //disableUser(id: string, req: Request, res: Response, next: NextFunction);
    //isClient(email:string, req: Request, res: Response, next: NextFunction);
    //isEmployee(email:string, req: Request, res: Response, next: NextFunction);
    disablePlace(req: Request, res: Response, next: NextFunction);
    existsPlace(address: string, req: Request, res: Response, next: NextFunction);
    findBarbeiros(req: Request, res: Response, next: NextFunction);
    findCabeleireiros(req: Request, res: Response, next: NextFunction);
    findEsteticistas(req: Request, res: Response, next: NextFunction);
    findSolarios(req: Request, res: Response, next: NextFunction);
    getPlace(name: string, req: Request, res: Response, next: NextFunction);
}