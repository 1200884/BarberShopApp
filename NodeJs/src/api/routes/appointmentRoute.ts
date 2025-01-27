import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import IAppointmentController from '../../controllers/IControllers/IAppointmentController';
import { Container } from 'typedi';
import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/appointment', route);

  const ctrl = Container.get(config.controllers.appointment.name) as IAppointmentController
  
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        place: Joi.string().required(),
        day: Joi.string().required(),
        accountable: Joi.string().required(),
        type: Joi.string().required(),
        email: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.createAppointment(req, res, next));

    route.get('',(req, res, next) => ctrl.getAppointments(req, res, next));
    route.get('/:str',(req, res, next) => ctrl.getAppointmentsFromPlace(req.params.str, req, res, next));
    route.get('/client/:str',(req, res, next) => ctrl.getAppointmentsFromUser(req.params.str, req, res, next));
    route.get('/:str/:str2',(req, res, next) => ctrl.getAppointmentsFromPlaceAndAccountable(req.params.str,req.params.str2, req, res, next));
   // route.post('/delete/:str/:str2/:str3/:str4/:str5',(req, res, next) => ctrl.deleteAppointment(req.params.str,req.params.str2,req.params.str3,req.params.str4,req.params.str5, req, res, next));
    route.post('/delete/', celebrate({
      body: Joi.object({
        day: Joi.string().required(),
        place: Joi.string().required(),
        email: Joi.string().required(),
        accountable: Joi.string().required(),
        type: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.deleteAppointment(req, res, next));
  /*route.delete('/:str',(req, res, next) => ctrl.disableUser(req.params.str, req, res, next));
  route.get('/isclient/:str', (req, res, next) => ctrl.isClient(req.params.str, req, res, next));
  route.get('/isemployee/:str', (req, res, next) => ctrl.isEmployee(req.params.str, req, res, next));*/

};
