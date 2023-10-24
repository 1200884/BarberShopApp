import { Router } from 'express';
import auth from './routes/userRoute';
import role from './routes/roleRoute';
import truckRoute from './routes/truckRoute';
import pathRoute from './routes/pathRoute';
import packagingRoute from './routes/packagingRoute';
import planningRoute from './routes/planningRoute';
import travelsRoute from './routes/travelsRoute';
import userRoute from './routes/userRoute';
import geneticplanningRoute from './routes/geneticplanningRoute';
import appointmentRoute from './routes/appointmentRoute';

export default () => {

	const app = Router();
	auth(app);
	role(app);
	truckRoute(app);
	pathRoute(app);
	packagingRoute(app);
	planningRoute(app);
	travelsRoute(app);
	userRoute(app);
	geneticplanningRoute(app);
	appointmentRoute(app)
	return app
}