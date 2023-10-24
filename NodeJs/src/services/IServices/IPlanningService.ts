import { Result } from "../../core/logic/Result";
import IPlanningDTO from "../../dto/IPlanningDTO";

export default interface IPlanningService  {
  getPlanning (truckId: string, date: string): Promise<Result<IPlanningDTO>>;
}
