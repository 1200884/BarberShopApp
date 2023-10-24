import { Result } from "../../core/logic/Result";
import ITravelsDTO from "../../dto/ITravelsDTO";

export default interface ITravelsService {
  getTravels(date: string): Promise<Result<ITravelsDTO>>;
  getAllTravels(): Promise<Result<ITravelsDTO[]>>;
}
