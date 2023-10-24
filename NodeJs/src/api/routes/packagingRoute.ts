import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPackagingController from '../../controllers/IControllers/IPackagingController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/packagings', route);

  const ctrl = Container.get(config.controllers.packaging.name) as IPackagingController;
/*  
  packagingId: number;
  boxId: number;
  positionX : number;
  positionY : number;
  positionZ : number */
  route.post('',
    celebrate({
      body: Joi.object({
        boxId: Joi.number().required(),
        positionX: Joi.number().required(),
        positionY: Joi.number().required(),
        positionZ: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createPackaging(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        boxId: Joi.number().required(),
        positionX: Joi.number().required(),
        positionY: Joi.number().required(),
        positionZ: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updatePackaging(req, res, next) );
    

    /*route.get('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required()
      }),
    }),
                      (req, res, next) => ctrl.getPackaging(req, res, next) );*/
    route.get('',(req, res, next) => ctrl.getPackagings(req, res, next));
    route.get('/:str', (req, res, next)=> ctrl.getPackaging(req.params.str, req, res, next));

  route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        boxId: Joi.number(),
        positionX: Joi.number(),
        positionY: Joi.number(),
        positionZ: Joi.number()
      }),
    }),
    (req, res, next) => ctrl.patchPackaging(req, res, next) );
}