import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/trucks', route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

  route.post('',
    celebrate({
      body: Joi.object({
        plate: Joi.string().required(),
        tare: Joi.number().required(),
        maxWeight: Joi.number().required(),
        batteryCapacity: Joi.number().required(),
        truckAutonomy: Joi.number().required(),
        chargeTime: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createTruck(req, res, next));

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        plate: Joi.string().required(),
        tare: Joi.number().required(),
        maxWeight: Joi.number().required(),
        batteryCapacity: Joi.number().required(),
        truckAutonomy: Joi.number().required(),
        chargeTime: Joi.number().required(),
        active: Joi.boolean().required()
      }),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next));

  route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        plate: Joi.string().required(),
        tare: Joi.number(),
        maxWeight: Joi.number(),
        batteryCapacity: Joi.number(),
        truckAutonomy: Joi.number(),
        chargeTime: Joi.number(),
        active: Joi.boolean()
      }),
    }),
    (req, res, next) => ctrl.patchTruck(req, res, next));

  route.get('', (req, res, next) => ctrl.getTrucks(req, res, next));

  route.get('/enabled', (req, res, next) => ctrl.getTrucksActivity(true, req, res, next));

  route.get('/disabled', (req, res, next) => ctrl.getTrucksActivity(false, req, res, next));

  route.get('/:str', (req, res, next) => ctrl.getTruck(req.params.str, req, res, next));

  route.delete('/:str', (req, res, next) => ctrl.deleteTruck(req.params.str, req, res, next));
};