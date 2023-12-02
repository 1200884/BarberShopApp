import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import IUserController from '../../controllers/IControllers/IUserController';
import { Container } from 'typedi';
import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  const ctrl = Container.get(config.controllers.user.name) as IUserController
  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        role: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.createUser(req, res, next));
    
  route.get('/deleteemployee/:str',(req, res, next) => ctrl.disableUser(req.params.str, req, res, next));
  route.post('/removefavorite/', celebrate({
    body: Joi.object({
      favorite: Joi.string().required(),
      email: Joi.string().required()
    }),
  }),
  (req, res, next) => ctrl.removeFavorite(req, res, next));
  route.get('/:str',(req, res, next) => ctrl.signIn(req.params.str, req, res, next));
  route.get('',(req, res, next) => ctrl.getUsers(req, res, next));
  route.get('/isclient/:str', (req, res, next) => ctrl.isClient(req.params.str, req, res, next));
  route.get('/isemployee/:str', (req, res, next) => ctrl.isEmployee(req.params.str, req, res, next));
  route.post(
    '/addfavorite',
    celebrate({
      body: Joi.object({
        favorite: Joi.string().required(),
        email: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.addFavorite(req, res, next));
  route.get('/getfavorites/:str', (req, res, next) => ctrl.getFavorites(req.params.str, req, res, next));
 


};
