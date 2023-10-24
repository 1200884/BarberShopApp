import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import ITravelsController from '../../controllers/IControllers/ITravelsController';

const route = Router();

export default (app: Router) => {
  app.use('/travels', route);

  const ctrl = Container.get(config.controllers.travels.name) as ITravelsController;

  route.get('', (req, res, next) => ctrl.getAllTravels(req, res, next));

  route.get('/:date', (req, res, next) => ctrl.getTravels(req.params.date, req, res, next));
};