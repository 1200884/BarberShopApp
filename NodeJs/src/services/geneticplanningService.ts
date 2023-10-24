import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IGeneticPlanningService from './IServices/IGeneticPlanningService';
import IGeneticPlanningDTO from '../dto/IGeneticPlanningDTO';
import { GeneticPlanningMap } from '../mappers/GeneticPlanningMap';
import IGeneticPlanningRepo from './IRepos/IGeneticPlanningRepo';
//import IDeliveryRepo from './IRepos/IDeliveryRepo';

@Service()
export default class GeneticPlanningService implements IGeneticPlanningService {
  constructor(
    @Inject(config.repos.geneticplanning.name) private geneticplanningRepo: IGeneticPlanningRepo,
    //@Inject(config.repos.delivery.name) private deliveryRepo: IDeliveryRepo
  ) { }

  public async getGeneticPlanning(alggenetico:IGeneticPlanningDTO): Promise<Result<String>> {
    try {

      //const deliveries = await this.deliveryRepo.findAll();

      const geneticplanning = await this.geneticplanningRepo.findByDomainId(alggenetico.date,alggenetico.nrgeracoes,alggenetico.tamanhopop,alggenetico.probcruzamento,alggenetico.probmutacao);
        console.log("sucesso"+geneticplanning);
      if (geneticplanning === null) {
        return Result.fail<String>("Planning not found");
      }
      else {
        
       // const geneticplanningDTOResult = GeneticPlanningMap.toDTO(geneticplanning) as IGeneticPlanningDTO;
        return Result.ok<String>(geneticplanning);
      }
    } catch (e) {
      throw e;
    }
  }
}
