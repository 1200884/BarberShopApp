import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IGeneticPlanningController from '../../controllers/IControllers/IGeneticPlanningController';

const route = Router();

export default (app: Router) => {
  app.use('/geneticplanning', route);

  const ctrl = Container.get(config.controllers.geneticplanning.name) as IGeneticPlanningController;
  
  route.post('',
  celebrate({
    body: Joi.object({
      date: Joi.number().required(),
      nrgeracoes: Joi.number().required(),
      tamanhopop: Joi.number().required(),
      probcruzamento:Joi.number().required(),
      probmutacao: Joi.number().required()
    })
  }),
  (req, res, next) => ctrl.getGeneticPlanning(req, res, next));

  
};