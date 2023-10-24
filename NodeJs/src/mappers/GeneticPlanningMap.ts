import { Mapper } from "../core/infra/Mapper";

import { GeneticPlanning } from "../domain/geneticplanning";
import { GeneticPlanningAnswer } from "../domain/geneticplanningAnswer";
import IGeneticPlanningAnswerDTO from "../dto/IGeneticPlanningAnswerDTO";
import IGeneticPlanningDTO from "../dto/IGeneticPlanningDTO";

export class GeneticPlanningMap extends Mapper<GeneticPlanning> {
  
  public static toDTO( geneticplanning: GeneticPlanning): IGeneticPlanningDTO {
    return {
      date: geneticplanning.date,
      nrgeracoes: geneticplanning.nrgeracoes,
      tamanhopop: geneticplanning.tamanhopop,
      probcruzamento:geneticplanning.probcruzamento,
      probmutacao: geneticplanning.probmutacao,
    } as IGeneticPlanningDTO
  }

  public static toDomain (geneticplanning: any): GeneticPlanning {
    const geneticplanningOrError = GeneticPlanning.create(
      geneticplanning
    );

    geneticplanningOrError.isFailure ? console.log(geneticplanningOrError.error) : '';

    return geneticplanningOrError.isSuccess ? geneticplanningOrError.getValue() : null;
  }
}