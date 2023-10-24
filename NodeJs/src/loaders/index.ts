import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';
import UserController from '../controllers/userController';
import AppointmentRepo from '../repos/appointmentRepo';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const truckSchema = {
    // compare with the approach followed in repos and services
    name: 'truckSchema',
    schema: '../persistence/schemas/truckSchema',
  };

  const pathSchema = {
    // compare with the approach followed in repos and services
    name: 'pathSchema',
    schema: '../persistence/schemas/pathSchema',
  };

  const packagingSchema = {
    // compare with the approach followed in repos and services
    name: 'packagingSchema',
    schema: '../persistence/schemas/packagingSchema',
  };

  const travelsSchema = {
    name: 'travelsSchema',
    schema: '../persistence/schemas/travelsSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }
  const appointmentController = {
    name: config.controllers.appointment.name,
    path: config.controllers.appointment.path
  }

  const truckController = {
    name: config.controllers.truck.name,
    path: config.controllers.truck.path
  }

  const pathController = {
    name: config.controllers.path.name,
    path: config.controllers.path.path
  }

  const packagingController = {
    name: config.controllers.packaging.name,
    path: config.controllers.packaging.path
  }

  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path
  }

  const planningController = {
    name: config.controllers.planning.name,
    path: config.controllers.planning.path
  }
  const geneticplanningController = {
    name: config.controllers.geneticplanning.name,
    path: config.controllers.geneticplanning.path
  }

  const travelsController = {
    name: config.controllers.travels.name,
    path: config.controllers.travels.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const truckRepo = {
    name: config.repos.truck.name,
    path: config.repos.truck.path
  }

  const pathRepo = {
    name: config.repos.path.name,
    path: config.repos.path.path
  }

  const packagingRepo = {
    name: config.repos.packaging.name,
    path: config.repos.packaging.path
  }
  const planningRepo = {
    name: config.repos.planning.name,
    path: config.repos.planning.path
  }
  const geneticplanningRepo = {
    name: config.repos.geneticplanning.name,
    path: config.repos.geneticplanning.path
  }
  const deliveryRepo = {
    name: config.repos.delivery.name,
    path: config.repos.delivery.path
  }

  const travelsRepo = {
    name: config.repos.travels.name,
    path: config.repos.travels.path
  }
  const appointmentRepo = {
    name: config.repos.appointment.name,
    path: config.repos.appointment.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const truckService = {
    name: config.services.truck.name,
    path: config.services.truck.path
  }

  const pathService = {
    name: config.services.path.name,
    path: config.services.path.path
  }

  const packagingService = {
    name: config.services.packaging.name,
    path: config.services.packaging.path
  }
  const appointmentService = {
    name: config.services.appointment.name,
    path: config.services.appointment.path
  }


  const planningService = {
    name: config.services.planning.name,
    path: config.services.planning.path
  }
  const geneticplanningService = {
    name: config.services.geneticplanning.name,
    path: config.services.geneticplanning.path
  }

  const travelsService = {
    name: config.services.travels.name,
    path: config.services.travels.path
  }

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path
  }



  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      truckSchema,
      pathSchema,
      packagingSchema,
      travelsSchema
    ],
    controllers: [
      roleController,
      truckController,
      pathController,
      packagingController,
      planningController,
      travelsController,
      userController,
      geneticplanningController,
      appointmentController
    ],
    repos: [
      roleRepo,
      userRepo,
      truckRepo,
      pathRepo,
      packagingRepo,
      planningRepo,
      deliveryRepo,
      travelsRepo,
      geneticplanningRepo,
      appointmentRepo
    ],
    services: [
      roleService,
      truckService,
      pathService,
      packagingService,
      planningService,
      travelsService,
      userService,
      geneticplanningService,
      appointmentService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
