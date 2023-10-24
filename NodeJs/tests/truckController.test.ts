import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import ITruckService from "../src/services/IServices/ITruckService";
import TruckController from "../src/controllers/truckController";
import ITruckDTO from '../src/dto/ITruckDTO';

describe('truck controller', function () {
	beforeEach(function () {
	});

	it('returns json with id+name values when createTruck', async function () {
		let body = { "plate": "AA-BB-00", "tare": 1, "maxWeight": 2, "batteryCapacity": 3, "truckAutonomy": 4, "chargeTime": 5 };
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };


		let truckSchemaInstance = require("../src/persistence/schemas/truckSchema").default;
		Container.set("truckSchema", truckSchemaInstance);

		let truckRepoClass = require("../src/repos/truckRepo").default;
		let truckRepoInstance = Container.get(truckRepoClass);
		Container.set("TruckRepo", truckRepoInstance);

		let truckServiceClass = require("../src/services/truckService").default;
		let truckServiceInstance = Container.get(truckServiceClass);
		Container.set("TruckService", truckServiceInstance);

		truckServiceInstance = Container.get("TruckService");
		sinon.stub(truckServiceInstance, "createTruck").returns(Result.ok<ITruckDTO>({ "id": "123", "plate": "AA-BB-00", "tare": req.body.tare, "maxWeight": req.body.maxWeight, "batteryCapacity": req.body.batteryCapacity, "truckAutonomy": req.body.truckAutonomy, "chargeTime": req.body.chargeTime, "active": true }));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "plate": "AA-BB-00", "tare": req.body.tare, "maxWeight": req.body.maxWeight, "batteryCapacity": req.body.batteryCapacity, "truckAutonomy": req.body.truckAutonomy, "chargeTime": req.body.chargeTime, "active": true }));
	});
});


