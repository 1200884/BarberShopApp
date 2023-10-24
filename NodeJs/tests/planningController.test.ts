import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IPlanningService from "../src/services/IServices/IPlanningService";
import PlanningController from "../src/controllers/planningController";
import IPlanningDTO from '../src/dto/IPlanningDTO';

describe('planning controller', function () {
	beforeEach(function() {
    });

    it('returns json with time+places values when getPlanning', async function () {
        let id = "eTruck01";

        let date = "20221205";

        let req: Partial<Request> = {};

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let planningRepoClass = require("../src/repos/planningRepo").default;
		let planningRepoInstance = Container.get(planningRepoClass);
		Container.set("PlanningRepo", planningRepoInstance);

		let planningServiceClass = require("../src/services/planningService").default;
		let planningServiceInstance = Container.get(planningServiceClass);
		Container.set("PlanningService", planningServiceInstance);

		planningServiceInstance = Container.get("PlanningService");
		sinon.stub(planningServiceInstance, "getPlanning").returns( Result.ok<IPlanningDTO>( {"time": 412.569279661017, "places": ["5, 8, 1, 3, 11, 9, 5"]} ));

		const ctrl = new PlanningController(planningServiceInstance as IPlanningService);

		await ctrl.getPlanning(id, date, <Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"time": 412.569279661017, "places": ["5, 8, 1, 3, 11, 9, 5"]}));
	});
});


