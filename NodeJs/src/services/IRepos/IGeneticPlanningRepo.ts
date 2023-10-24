import { Repo } from "../../core/infra/Repo";
import { GeneticPlanningAnswer } from "../../domain/geneticplanningAnswer";

export default interface IGeneticPlanningRepo extends Repo<GeneticPlanningAnswer> {
  findByDomainId (date: number,geracoes:number,populacao:number,cruzamento:number,mutacao:number): Promise<String>;
}