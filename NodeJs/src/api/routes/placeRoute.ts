import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import IPlaceController from '../../controllers/IControllers/IPlaceController';
import { Container } from 'typedi';
import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/place', route);

  const ctrl = Container.get(config.controllers.place.name) as IPlaceController
  
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        image: Joi.string().required(),
        type: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.createPlace(req, res, next));

    route.get('',(req, res, next) => ctrl.getPlaces(req, res, next));
   //route.delete('/:str',(req, res, next) => ctrl.disableUser(req.params.str, req, res, next));
    route.get('/solarios',(req, res, next) => ctrl.findSolarios( req, res, next));
    route.get('/barbeiros',(req, res, next) => ctrl.findBarbeiros( req, res, next));
    route.get('/cabeleireiros',(req, res, next) => ctrl.findCabeleireiros( req, res, next));
    route.get('/esteticistas',(req, res, next) => ctrl.findEsteticistas( req, res, next));




};
