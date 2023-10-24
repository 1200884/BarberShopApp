import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TruckId } from "./truckId";

import ITruckDTO from "../dto/ITruckDTO";

interface TruckProps {
  plate: string;
  tare: number;
  maxWeight: number;
  batteryCapacity: number;
  truckAutonomy: number;
  chargeTime: number;
  active: boolean;
}

export class Truck extends AggregateRoot<TruckProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get truckId(): TruckId {
    return new TruckId(this.truckId.toValue());
  }

  get plate(): string {
    return this.props.plate;
  }

  set plate(value: string) {
    this.props.plate = value;
  }

  get tare(): number {
    return this.props.tare;
  }

  set tare(value: number) {
    this.props.tare = value;
  }

  get maxWeight(): number {
    return this.props.maxWeight;
  }

  set maxWeight(value: number) {
    this.props.maxWeight = value;
  }

  get batteryCapacity(): number {
    return this.props.batteryCapacity;
  }

  set batteryCapacity(value: number) {
    this.props.batteryCapacity = value;
  }

  get truckAutonomy(): number {
    return this.props.truckAutonomy;
  }

  set truckAutonomy(value: number) {
    this.props.truckAutonomy = value;
  }

  get chargeTime(): number {
    return this.props.chargeTime;
  }

  set chargeTime(value: number) {
    this.props.chargeTime = value;
  }

  get active(): boolean {
    return this.props.active;
  }

  set active(value: boolean) {
    this.props.active = value;
  }

  private constructor(props: TruckProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(truckDTO: ITruckDTO, id?: UniqueEntityID): Result<Truck> {
    const plate = truckDTO.plate;
    const tare = truckDTO.tare;
    const maxWeight = truckDTO.maxWeight;
    const batteryCapacity = truckDTO.batteryCapacity;
    const truckAutonomy = truckDTO.truckAutonomy;
    const chargeTime = truckDTO.chargeTime;

    plate.split("-");
    if (plate.length !== 8) {
      return Result.fail<Truck>('The plate size is not correct')
    } else if(!/^[A-Z0-9]{2}$/.test(plate.substring(0, 2)) || !/^[A-Z0-9]{2}$/.test(plate.substring(3, 5)) || !/^[A-Z0-9]{2}$/.test(plate.substring(6, 8)) ) {
      return Result.fail<Truck>('The plate does not follow the format XX-XX-XX where X represents a number or a letter')
    } else if (tare < 0 || maxWeight < 0 || batteryCapacity < 0 || truckAutonomy < 0 || chargeTime < 0) {
      return Result.fail<Truck>('Must provide positive data')
    } else {
      const truck = new Truck({ plate: plate, tare: tare, maxWeight: maxWeight, batteryCapacity: batteryCapacity, truckAutonomy: truckAutonomy, chargeTime: chargeTime, active: true }, id);
      return Result.ok<Truck>(truck)
    }
  }

  public static createFromBD(truckDTO: ITruckDTO, id?: UniqueEntityID): Result<Truck> {
    const plate = truckDTO.plate;
    const tare = truckDTO.tare;
    const maxWeight = truckDTO.maxWeight;
    const batteryCapacity = truckDTO.batteryCapacity;
    const truckAutonomy = truckDTO.truckAutonomy;
    const chargeTime = truckDTO.chargeTime;
    const active = truckDTO.active;

    if (tare < 0 || maxWeight < 0 || batteryCapacity < 0 || truckAutonomy < 0 || chargeTime < 0) {
      return Result.fail<Truck>('Must provide positive data')
    } else {
      const truck = new Truck({ plate: plate, tare: tare, maxWeight: maxWeight, batteryCapacity: batteryCapacity, truckAutonomy: truckAutonomy, chargeTime: chargeTime, active: active }, id);
      return Result.ok<Truck>(truck)
    }
  }
}
