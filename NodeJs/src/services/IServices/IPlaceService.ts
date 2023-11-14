import { Result } from "../../core/logic/Result";
import { Place } from "../../domain/place";
import { IPlaceDTO } from "../../dto/IPlaceDTO";

export default interface IPlaceService  {
  createPlace(placeDTO: IPlaceDTO): Promise<Result<IPlaceDTO>>;
  disablePlace(place:string, day:string, hour: string, type: string): Promise<Result<IPlaceDTO>>;
  getPlaces(): Promise<Result<IPlaceDTO[]>>;
  existsPlace(address: string)
  findBarbeiros():Promise<Result<IPlaceDTO[]>>;
  findCabeleireiros():Promise<Result<IPlaceDTO[]>>;
  findEsteticistas():Promise<Result<IPlaceDTO[]>>;
  findSolarios():Promise<Result<IPlaceDTO[]>>;
}