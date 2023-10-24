import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import ITruckService from "../services/IServices/ITruckService";
import TruckController from "./truckController";
import ITruckDTO from '../dto/ITruckDTO';

describe('truck controller', function () {
	beforeEach(function() {
    });

    it('createTruck: returns json with id+name values', async function () {
        let body = { "name":'truck12' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let truckServiceClass = require(config.services.truck.path).default;
		let truckServiceInstance = Container.get(truckServiceClass)
		Container.set(config.services.truck.name, truckServiceInstance);

		truckServiceInstance = Container.get(config.services.truck.name);
		sinon.stub(truckServiceInstance, "createTruck").returns( Result.ok<ITruckDTO>( { "id": "123", "plate": "AA-BB-00", "tare": req.body.tare, "maxWeight": req.body.maxWeight, "batteryCapacity": req.body.batteryCapacity, "truckAutonomy": req.body.truckAutonomy, "chargeTime": req.body.chargeTime, "active": true } ));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "plate": "AA-BB-00", "tare": req.body.tare, "maxWeight": req.body.maxWeight, "batteryCapacity": req.body.batteryCapacity, "truckAutonomy": req.body.truckAutonomy, "chargeTime": req.body.chargeTime, "active": true }));
	});
});