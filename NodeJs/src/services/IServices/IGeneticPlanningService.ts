import { Result } from "../../core/logic/Result";
import IGeneticPlanningDTO from "../../dto/IGeneticPlanningDTO";

export default interface IGeneticPlanningService  {
  getGeneticPlanning (req:IGeneticPlanningDTO): Promise<Result<String>>;
}
