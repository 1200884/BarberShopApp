import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPathController from '../../controllers/IControllers/IPathController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/paths', route);

  const ctrl = Container.get(config.controllers.path.name) as IPathController;

  route.post('',
    celebrate({
      body: Joi.object({
        warehouseDeparture: Joi.number().required(),
        warehouseDestination: Joi.number().required(),
        distance: Joi.number().required(),
        travelTime:Joi.number().required(),
        energyNecessary: Joi.number().required(),
        additionalTime: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createPath(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        warehouseDeparture: Joi.number().required(),
        warehouseDestination: Joi.number().required(),
        distance: Joi.number().required(),
        travelTime:Joi.number().required(),
        energyNecessary: Joi.number().required(),
        additionalTime: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updatePath(req, res, next) );

    route.get('', (req, res, next) => ctrl.getPaths(req, res, next));

    route.get('/:str', (req, res, next) => ctrl.getPath(req.params.str, req, res, next));

  route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        warehouseDeparture: Joi.number(),
        warehouseDestination: Joi.number(),
        distance: Joi.number(),
        travelTime:Joi.number(),
        energyNecessary: Joi.number(),
        additionalTime: Joi.number()
      }),
    }),
    (req, res, next) => ctrl.patchPath(req, res, next) );
};