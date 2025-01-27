import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';

import ITruckDTO from "../dto/ITruckDTO";
import { Truck } from "../domain/truck";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class TruckMap extends Mapper<Truck> {
  
  public static toDTO( truck: Truck): ITruckDTO {
    return {
      id: truck.id.toString(),
      plate: truck.plate,
      tare: truck.tare,
      maxWeight: truck.maxWeight,
      batteryCapacity: truck.batteryCapacity,
      truckAutonomy: truck.truckAutonomy,
      chargeTime: truck.chargeTime,
      active: truck.active
    } as ITruckDTO;
  }

  public static toDomain (truck: any | Model<ITruckPersistence & Document> ): Truck {
    const truckOrError = Truck.createFromBD(
      truck,
      new UniqueEntityID(truck.domainId)
    );

    truckOrError.isFailure ? console.log(truckOrError.error) : '';

    return truckOrError.isSuccess ? truckOrError.getValue() : null;
  }

  public static toPersistence (truck: Truck): any {
    return {
      domainId: truck.id.toString(),
      plate: truck.plate,
      tare: truck.tare,
      maxWeight: truck.maxWeight,
      batteryCapacity: truck.batteryCapacity,
      truckAutonomy: truck.truckAutonomy,
      chargeTime: truck.chargeTime,
      active: truck.active
    }
  }
}