import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IPlanningService from './IServices/IPlanningService';
import IPlanningDTO from '../dto/IPlanningDTO';
import { PlanningMap } from '../mappers/PlanningMap';
import IPlanningRepo from './IRepos/IPlanningRepo';
//import IDeliveryRepo from './IRepos/IDeliveryRepo';

@Service()
export default class PlanningService implements IPlanningService {
  constructor(
    @Inject(config.repos.planning.name) private planningRepo: IPlanningRepo,
    //@Inject(config.repos.delivery.name) private deliveryRepo: IDeliveryRepo
  ) { }

  public async getPlanning(truckId: string, date: string): Promise<Result<IPlanningDTO>> {
    try {

      //const deliveries = await this.deliveryRepo.findAll();

      const planning = await this.planningRepo.findByDomainId(truckId, date);

      if (planning === null) {
        return Result.fail<IPlanningDTO>("Planning not found");
      }
      else {
        const planningDTOResult = PlanningMap.toDTO(planning) as IPlanningDTO;
        return Result.ok<IPlanningDTO>(planningDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }
}
