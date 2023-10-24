import { Mapper } from "../core/infra/Mapper";

import { GeneticPlanningAnswer } from "../domain/geneticplanningAnswer";
import IGeneticPlanningAnswerDTO from "../dto/IGeneticPlanningAnswerDTO";

export class GeneticPlanningAnswerMap extends Mapper<GeneticPlanningAnswer> {

  public static toDTO( geneticplanningAnswer: GeneticPlanningAnswer): IGeneticPlanningAnswerDTO {
    return {
      places: geneticplanningAnswer.places,
    } as IGeneticPlanningAnswerDTO
  }

  public static toDomain (geneticplanningAnswer: any): GeneticPlanningAnswer {
    const geneticplanningAnswerOrError = GeneticPlanningAnswer.create(
      geneticplanningAnswer
    );

    geneticplanningAnswerOrError.isFailure ? console.log(geneticplanningAnswerOrError.error) : '';

    return geneticplanningAnswerOrError.isSuccess ? geneticplanningAnswerOrError.getValue() : null;
  }

  public static toDomain2 (places: [[string]]): GeneticPlanningAnswer {
    const geneticplanningAnswerOrError = GeneticPlanningAnswer.createNew(
      places
    );
    
    geneticplanningAnswerOrError.isFailure ? console.log(geneticplanningAnswerOrError.error) : '';

    return geneticplanningAnswerOrError.isSuccess ? geneticplanningAnswerOrError.getValue() : null;
  }
}