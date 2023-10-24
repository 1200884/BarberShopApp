import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PathId } from "./pathId";

import IPathDTO from "../dto/IPathDTO";

interface PathProps {
  warehouseDeparture: number;
  warehouseDestination: number;
  distance:number;
  travelTime:number;
  energyNecessary:number;
  additionalTime:number;
}

export class Path extends AggregateRoot<PathProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get pathId (): PathId {
    return new PathId(this.pathId.toValue());
  }

  get warehouseDeparture (): number {
    return this.props.warehouseDeparture;
  }
  
  set warehouseDeparture ( value: number) {
    this.props.warehouseDeparture = value;
  }
  
  get warehouseDestination (): number {
    return this.props.warehouseDestination;
  }

  set warehouseDestination ( value: number) {
    this.props.warehouseDestination = value;
  }

  get distance (): number {
    return this.props.distance;
  }

  set distance ( value: number) {
    this.props.distance = value;
  }

  get travelTime (): number {
    return this.props.travelTime;
  }

  set travelTime ( value: number) {
    this.props.travelTime = value;
  }

  get energyNecessary (): number {
    return this.props.energyNecessary;
  }

  set energyNecessary( value: number) {
    this.props.energyNecessary = value;
  }
  get additionalTime (): number {
    return this.props.additionalTime;
  }

  set additionalTime( value: number) {
    this.props.additionalTime = value;
  }

  private constructor (props: PathProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (pathDTO: IPathDTO, id?: UniqueEntityID): Result<Path> {
    const warehouseDeparture = pathDTO.warehouseDeparture;
    const warehouseDestination = pathDTO.warehouseDestination;
    const distance = pathDTO.distance;
    const travelTime = pathDTO.travelTime;
    const energyNecessary = pathDTO.energyNecessary;
    const additionalTime = pathDTO.additionalTime;
    if (warehouseDeparture < 0 || warehouseDeparture > 17 || warehouseDestination < 0 || warehouseDestination > 17 || distance < 0 || travelTime < 0 || energyNecessary < 0 || additionalTime < 0) {
      return Result.fail<Path>('Must provide positive data')
    } else {
      const path = new Path({ warehouseDeparture: warehouseDeparture, warehouseDestination: warehouseDestination, distance: distance, travelTime: travelTime, energyNecessary: energyNecessary,additionalTime:additionalTime }, id);
      return Result.ok<Path>( path )
    }
  }
}
