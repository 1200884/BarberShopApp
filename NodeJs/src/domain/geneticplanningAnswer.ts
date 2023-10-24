import { AggregateRoot } from "../core/domain/AggregateRoot";

import { Result } from "../core/logic/Result";
import IGeneticPlanningAnswerDTO from "../dto/IGeneticPlanningAnswerDTO";
import { Travels } from "./travels";


interface GeneticPlanningAnswerProps {
  places: [[string]];

}

export class GeneticPlanningAnswer extends AggregateRoot<GeneticPlanningAnswerProps> {


  get places(): [[string]] {
    return this.props.places;
  }

  set places(value: [[string]]) {
    this.props.places = value;
  }



  private constructor(props: GeneticPlanningAnswerProps) {
    super(props);
  }

  public static create(geneticplanningDTO: IGeneticPlanningAnswerDTO): Result<GeneticPlanningAnswer> {

    const places = geneticplanningDTO.places;
    const geneticplanning = new GeneticPlanningAnswer({ places: places });
    return Result.ok<GeneticPlanningAnswer>(geneticplanning)
  }

  public static createNew(places: [[string]]): Result<GeneticPlanningAnswer> {
    const geneticplanning = new GeneticPlanningAnswer({places: places});
    return Result.ok<GeneticPlanningAnswer>(geneticplanning);
  }
}

