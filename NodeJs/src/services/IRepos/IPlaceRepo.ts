import { Repo } from "../../core/infra/Repo";
import { Place } from "../../domain/place";

export default interface IPlaceRepo extends Repo<Place> {
	save(place: Place): Promise<Place>;
	//findById (id: string): Promise<Place>;
	findAll(): Promise<Place[]>;
    //findByHour(hour: string): Promise<Place[]>
    existsPlace(address: string)
    findBarbeiros():Promise<Place[]>;
    findCabeleireiros():Promise<Place[]>;
	findEsteticistas():Promise<Place[]>;
    findSolarios():Promise<Place[]>;
}
  