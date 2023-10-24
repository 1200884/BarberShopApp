import { Repo } from "../../core/infra/Repo";
import { Truck } from "../../domain/truck";
import { TruckId } from "../../domain/truckId";

export default interface ITruckRepo extends Repo<Truck> {
  save(truck: Truck): Promise<Truck>;
  findByDomainId(truckId: TruckId | string): Promise<Truck>;
  removeByTruckId(truckId: TruckId | string): Promise<Truck>;
  findAll(): Promise<Truck[]>;
  findAllActivity(active: boolean): Promise<Truck[]>

  //findByIds (trucksIds: TruckId[]): Promise<Truck[]>;
  //saveCollection (trucks: Truck[]): Promise<Truck[]>;
  //removeByTruckIds (trucks: TruckId[]): Promise<any>
}