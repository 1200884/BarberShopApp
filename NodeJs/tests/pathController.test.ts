import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IPathService from "../src/services/IServices/IPathService";
import PathController from "../src/controllers/pathController";
import IPathDTO from '../src/dto/IPathDTO';

describe('path controller', function () {
	beforeEach(function() {
    });

    it('returns json with id+name values when createPath', async function () {
        let body = { "warehouseDeparture":1,"warehouseDestination":2,"distance":3,"travelTime":4,"energyNecessary":5,"additionalTime":6 };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};


		let pathSchemaInstance = require("../src/persistence/schemas/pathSchema").default;
		Container.set("pathSchema", pathSchemaInstance);

		let pathRepoClass = require("../src/repos/pathRepo").default;
		let pathRepoInstance = Container.get(pathRepoClass);
		Container.set("PathRepo", pathRepoInstance);

		let pathServiceClass = require("../src/services/pathService").default;
		let pathServiceInstance = Container.get(pathServiceClass);
		Container.set("PathService", pathServiceInstance);

		pathServiceInstance = Container.get("PathService");
		sinon.stub(pathServiceInstance, "createPath").returns( Result.ok<IPathDTO>( {"id":"123", "warehouseDeparture":req.body.warehouseDeparture,"warehouseDestination":req.body.warehouseDestination,"distance":req.body.distance,"travelTime":req.body.travelTime,"energyNecessary":req.body.energyNecessary,"additionalTime":req.body.additionalTime} ));

		const ctrl = new PathController(pathServiceInstance as IPathService);

		await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "warehouseDeparture":req.body.warehouseDeparture,"warehouseDestination":req.body.warehouseDestination,"distance":req.body.distance,"travelTime":req.body.travelTime,"energyNecessary":req.body.energyNecessary,"additionalTime":req.body.additionalTime}));
	});
});


