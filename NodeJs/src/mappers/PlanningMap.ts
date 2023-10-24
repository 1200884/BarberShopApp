import { Mapper } from "../core/infra/Mapper";

import { Planning } from "../domain/planning";
import IPlanningDTO from "../dto/IPlanningDTO";

export class PlanningMap extends Mapper<Planning> {
  
  public static toDTO( planning: Planning): IPlanningDTO {
    return {
      time: planning.time,
      places: planning.places
    } as IPlanningDTO;
  }

  public static toDomain (planning: any): Planning {
    const planningOrError = Planning.create(
      planning
    );

    planningOrError.isFailure ? console.log(planningOrError.error) : '';

    return planningOrError.isSuccess ? planningOrError.getValue() : null;
  }

  public static toPersistence (planning: Planning): any {
    return {
      time: planning.time,
      places: planning.places
    }
  }
}