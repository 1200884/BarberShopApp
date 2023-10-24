import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import IPackagingService from "../services/IServices/IPackagingService";
import PackagingController from "./packagingController";
import IPackagingDTO from '../dto/IPackagingDTO';


describe('packaging controller', function () {
	beforeEach(function() {
    });
//Packaging packaging
    /*it('createPackaging: returns json with id+name values', async function () {
        let body = { "name":'path436' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let packagingServiceClass = require(config.services.packaging.packaging).default;
		let packagingServiceInstance = Container.get(packagingServiceClass)
		Container.set(config.services.packaging.name, packagingServiceInstance);

		packagingServiceInstance = Container.get(config.services.path.name);
		sinon.stub(packagingServiceInstance, "createPath").returns( Result.ok<IPackagingDTO>( {"pathid": "437","warehouseDestination": req.body.warehouseDestination, "warehouseDeparture":req.body.warehouseDeparture,"distance":req.body.distance,"travelTime":req.body.travelTime,"energyNecessary":req.body.energyNecessary,"additionalTime":req.body.additionalTime} ));

		const ctrl = new PackagingController(pathServiceInstance as IPackagingService);

		await ctrl.createPackaging(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "pathid": "437","warehouseDestination": req.body.warehouseDestination, "warehouseDeparture":req.body.warehouseDeparture,"distance":req.body.distance,"travelTime":req.body.travelTime,"energyNecessary":req.body.energyNecessary,"additionalTime":req.body.additionalTime}));
	})*/});
;
