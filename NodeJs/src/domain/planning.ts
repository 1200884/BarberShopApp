import { AggregateRoot } from "../core/domain/AggregateRoot";

import { Result } from "../core/logic/Result";

import IPlanningDTO from "../dto/IPlanningDTO";

interface PlanningProps {
    time: number;
    places: [string];
}

export class Planning extends AggregateRoot<PlanningProps> {
  get time (): number {
    return this.props.time;
  }
  
  set time ( value: number) {
    this.props.time = value;
  }

  get places (): [string] {
    return this.props.places;
  }

  set places ( value: [string]) {
    this.props.places = value;
  }

  private constructor (props: PlanningProps) {
    super(props);
  }

  public static create (planningDTO: IPlanningDTO): Result<Planning> {
    const time = planningDTO.time;
    const places = planningDTO.places;

    if (time < 0) {
      return Result.fail<Planning>('Must provide positive data')
    } else {
      const planning = new Planning({ time: time, places: places});
      return Result.ok<Planning>( planning )
    }
  }
}
