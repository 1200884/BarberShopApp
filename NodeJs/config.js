import dotenv from 'dotenv';
import packagingRoute from './src/api/routes/packagingRoute';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 2223,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.DATABASE_URL || "postgresql://postgres:ShawnMichaels@localhost:5432/TesteBaseDados",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    appointment: {
      name: "AppointmentController",
      path: "../controllers/appointmentController"
    },
    truck: {
      name: "TruckController",
      path: "../controllers/truckController"
    },
    path: {
      name: "PathController",
      path: "../controllers/pathController"
    },
    packaging: {
      name: "PackagingController",
      path: "../controllers/packagingController"
    },
    planning: {
      name: "PlanningController",
      path: "../controllers/planningController"
    },
    geneticplanning: {
      name: "GeneticPlanningController",
      path: "../controllers/geneticplanningController"
    },
    travels: {
      name: "TravelsController",
      path: "../controllers/travelsController"
    },
    user: {
      name: "UserController",
      path: "../controllers/userController"
    },
    appointment: {
      name: "AppointmentController",
      path: "../controllers/appointmentController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    appointment: {
      name: "AppointmentRepo",
      path: "../repos/appointmentRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    truck: {
      name: "TruckRepo",
      path: "../repos/truckRepo"
    },
    path: {
      name: "PathRepo",
      path: "../repos/pathRepo"
    },
    packaging: {
      name: "PackagingRepo",
      path: "../repos/packagingRepo"
    },
    planning: {
      name: "PlanningRepo",
      path: "../repos/planningRepo"
    },
    
    delivery: {
      name: "DeliveryRepo",
      path: "../repos/deliveryRepo"
    },
    travels: {
      name: "TravelsRepo",
      path: "../repos/travelsRepo"
    },
    geneticplanning: {
      name: "GeneticPlanningRepo",
      path: "../repos/geneticplanningRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    appointment: {
      name: "AppointmentService",
      path: "../services/appointmentService"
    },
    truck: {
      name: "TruckService",
      path: "../services/truckService"
    },
    path: {
      name: "PathService",
      path: "../services/pathService"
    },
    packaging: {
      name: "PackagingService",
      path: "../services/packagingService"
    },
    planning: {
      name: "PlanningService",
      path: "../services/planningService"
    },
    geneticplanning: {
      name: "PlanningService",
      path: "../services/geneticplanningService"
    },
    travels: {
      name: "TravelsService",
      path: "../services/travelsService"
    },
    user: {
      name: "UserService",
      path: "../services/userService"
    }
  },
};
