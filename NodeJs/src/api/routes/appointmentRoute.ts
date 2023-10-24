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
        hour: Joi.string().required(),
        type: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.createAppointment(req, res, next));

 /* route.get('/:str',(req, res, next) => ctrl.signIn(req.params.str, req, res, next));
  route.get('',(req, res, next) => ctrl.getUsers(req, res, next));
  route.delete('/:str',(req, res, next) => ctrl.disableUser(req.params.str, req, res, next));
  route.get('/isclient/:str', (req, res, next) => ctrl.isClient(req.params.str, req, res, next));
  route.get('/isemployee/:str', (req, res, next) => ctrl.isEmployee(req.params.str, req, res, next));*/

};
