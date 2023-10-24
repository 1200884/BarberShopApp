import { Request, Response, NextFunction } from 'express';

export default interface IUserController {
    createAppointment(req: Request, res: Response, next: NextFunction);
    //signIn(id: string, req: Request, res: Response, next: NextFunction);
    //getUsers(req: Request, res: Response, next: NextFunction);
    //disableUser(id: string, req: Request, res: Response, next: NextFunction);
    //isClient(email:string, req: Request, res: Response, next: NextFunction);
    //isEmployee(email:string, req: Request, res: Response, next: NextFunction);
}