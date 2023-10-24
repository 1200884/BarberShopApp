import { Service, Inject } from 'typedi';
import config from "../../config";
import ITruckDTO from '../dto/ITruckDTO';
import { Truck } from "../domain/truck";
import ITruckRepo from '../services/IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import { Result } from "../core/logic/Result";
import { TruckMap } from "../mappers/TruckMap";

@Service()
export default class TruckService implements ITruckService {
  constructor(
    @Inject(config.repos.truck.name) private truckRepo: ITruckRepo
  ) { }

  public async getTruck(truckId: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async deleteTruck(truckId: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck does not exist");
      }
      else {
        const deletedTruck = await this.truckRepo.removeByTruckId(truckId);

        if (deletedTruck === null) {
          return Result.fail<ITruckDTO>("Truck could not be deleted");
        }
        else {
          const deletedTruckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
          return Result.ok<ITruckDTO>(deletedTruckDTOResult);
        }
      }
    } catch (e) {
      throw e;
    }
  }

  public async getTrucks(): Promise<Result<ITruckDTO[]>> {
    try {
      const trucks = await this.truckRepo.findAll();
      var finalTrucks: Array<ITruckDTO> = [];

      if (trucks == null) {
        return Result.fail<ITruckDTO[]>("There was a problem assembling the trucks");
      }
      else {
        for (var i = 0; i < trucks.length; i++) {
          finalTrucks.push(TruckMap.toDTO(trucks[i]) as ITruckDTO);
        }
        return Result.ok<ITruckDTO[]>(finalTrucks)
      }
    } catch (e) {
      throw e;
    }
  }

  public async getTrucksActivity(activity: boolean): Promise<Result<ITruckDTO[]>> {
    try {
      const trucks = await this.truckRepo.findAllActivity(activity);
      var finalTrucks: Array<ITruckDTO> = [];

      if (trucks == null) {
        return Result.fail<ITruckDTO[]>("There was a problem assembling the trucks");
      }
      else {
        for (var i = 0; i < trucks.length; i++) {
          finalTrucks.push(TruckMap.toDTO(trucks[i]) as ITruckDTO);
        }
        return Result.ok<ITruckDTO[]>(finalTrucks);
      }
    }
    catch (e) {
      throw e;
    }
  }


  public async createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {

      const truckOrError = await Truck.create(truckDTO);

      if (truckOrError.isFailure) {
        return Result.fail<ITruckDTO>(truckOrError.errorValue());
      }

      const truckResult = truckOrError.getValue();

      await this.truckRepo.save(truckResult);

      const truckDTOResult = TruckMap.toDTO(truckResult) as ITruckDTO;
      return Result.ok<ITruckDTO>(truckDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckDTO.id);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        truck.tare = truckDTO.tare;
        truck.maxWeight = truckDTO.maxWeight;
        truck.batteryCapacity = truckDTO.batteryCapacity;
        truck.truckAutonomy = truckDTO.truckAutonomy;
        truck.chargeTime = truckDTO.chargeTime;
        truck.active = truckDTO.active;
        await this.truckRepo.save(truck);

        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async patchTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckDTO.id);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        if (truckDTO.tare != undefined) {
          truck.tare = truckDTO.tare;
        }
        if (truckDTO.maxWeight != undefined) {
          truck.maxWeight = truckDTO.maxWeight;
        }
        if (truckDTO.batteryCapacity != undefined) {
          truck.batteryCapacity = truckDTO.batteryCapacity;
        }
        if (truckDTO.truckAutonomy != undefined) {
          truck.truckAutonomy = truckDTO.truckAutonomy;
        }
        if (truckDTO.chargeTime != undefined) {
          truck.chargeTime = truckDTO.chargeTime;
        }
        if (truckDTO.active != undefined) {
          truck.active = truckDTO.active;
        }
        await this.truckRepo.save(truck);

        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
}
