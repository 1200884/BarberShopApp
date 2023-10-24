import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IPlanningController from '../../controllers/IControllers/IPlanningController';

const route = Router();

export default (app: Router) => {
  app.use('/planning', route);

  const ctrl = Container.get(config.controllers.planning.name) as IPlanningController;

  route.get('/:id/:date', (req, res, next) => ctrl.getPlanning(req.params.id, req.params.date, req, res, next));
};