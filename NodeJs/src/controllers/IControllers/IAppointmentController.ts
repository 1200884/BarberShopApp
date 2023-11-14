import { Request, Response, NextFunction } from 'express';

export default interface IAppointmentController {
    createAppointment(req: Request, res: Response, next: NextFunction);
    //signIn(id: string, req: Request, res: Response, next: NextFunction);
    getAppointments(req: Request, res: Response, next: NextFunction);
    //disableUser(id: string, req: Request, res: Response, next: NextFunction);
    //isClient(email:string, req: Request, res: Response, next: NextFunction);
    //isEmployee(email:string, req: Request, res: Response, next: NextFunction);
}