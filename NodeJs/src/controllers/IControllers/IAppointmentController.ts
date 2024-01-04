import { Request, Response, NextFunction } from 'express';
import { Place } from '../../domain/place';

export default interface IAppointmentController {
    createAppointment(req: Request, res: Response, next: NextFunction);
    //signIn(id: string, req: Request, res: Response, next: NextFunction);
    getAppointments(req: Request, res: Response, next: NextFunction);
    getAppointmentsFromPlace(placename: string, req: Request, res: Response, next: NextFunction);
    getAppointmentsFromPlaceAndAccountable(placename: string, accountable: string, req: Request, res: Response, next: NextFunction);
    getAppointmentsFromUser(email: string, req: Request, res: Response, next: NextFunction);
    deleteAppointment(req: Request, res: Response, next: NextFunction);

    //isClient(email:string, req: Request, res: Response, next: NextFunction);
    //isEmployee(email:string, req: Request, res: Response, next: NextFunction);
}