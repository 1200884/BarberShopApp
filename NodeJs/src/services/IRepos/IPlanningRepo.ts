import { Repo } from "../../core/infra/Repo";
import { Planning } from "../../domain/planning";

export default interface IPlanningRepo extends Repo<Planning> {
  findByDomainId (truckId: string, data: string): Promise<Planning>;
}