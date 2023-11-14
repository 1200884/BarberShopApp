import { Service, Inject } from 'typedi';
import config from "../../config";
import { IPlaceDTO } from '../dto/IPlaceDTO';
import { Place } from '../domain/place';
import IPlaceRepo from './IRepos/IPlaceRepo';
import IPlaceService from './IServices/IPlaceService';
import { Result } from "../core/logic/Result";
import { PlaceMap } from '../mappers/PlaceMap';
import { forEach } from 'lodash';

@Service()
export default class PlaceService implements IPlaceService {
  constructor(
    @Inject(config.repos.place.name) private placeRepo: IPlaceRepo,
  ) { }
    existsPlace(address: string) {
        throw new Error('Method not implemented.');
    }

    public async findBarbeiros(): Promise<Result<IPlaceDTO[]>> {
        try{
            const place= await this.placeRepo.findBarbeiros();
          
          if (place === null) {
            return Result.fail<IPlaceDTO[]>("Place not found");
          }
          
          else{
            const placeDTOResult = [];
            for (let i = 0; i < place.length; i++) {
                const places = place[i];
                const placeDTO =PlaceMap.toDTO(places);
                placeDTOResult.push(placeDTO);
            }
            
            return Result.ok(placeDTOResult);
          }
        }catch (e) {
            throw e;
          }
      }    
      public async findCabeleireiros(): Promise<Result<IPlaceDTO[]>> {
        try{
            const place= await this.placeRepo.findCabeleireiros();
          
          if (place === null) {
            return Result.fail<IPlaceDTO[]>("Place not found");
          }
          
          else{
            const placeDTOResult = [];
            for (let i = 0; i < place.length; i++) {
                const places = place[i];
                const placeDTO =PlaceMap.toDTO(places);
                placeDTOResult.push(placeDTO);
            }
            
            return Result.ok(placeDTOResult);
          }
        }catch (e) {
            throw e;
          }
    }
    public async findEsteticistas(): Promise<Result<IPlaceDTO[]>> {
        try{
            const place= await this.placeRepo.findEsteticistas();
          
          if (place === null) {
            return Result.fail<IPlaceDTO[]>("Place not found");
          }
          
          else{
            const placeDTOResult = [];
            for (let i = 0; i < place.length; i++) {
                const places = place[i];
                const placeDTO =PlaceMap.toDTO(places);
                placeDTOResult.push(placeDTO);
            }
            
            return Result.ok(placeDTOResult);
          }
        }catch (e) {
            throw e;
          }
    }
    public async findSolarios(): Promise<Result<IPlaceDTO[]>> {
        try{
            const place= await this.placeRepo.findSolarios();
          
          if (place === null) {
            return Result.fail<IPlaceDTO[]>("Place not found");
          }
          
          else{
            const placeDTOResult = [];
            for (let i = 0; i < place.length; i++) {
                const places = place[i];
                const placeDTO =PlaceMap.toDTO(places);
                placeDTOResult.push(placeDTO);
            }
            
            return Result.ok(placeDTOResult);
          }
        }catch (e) {
            throw e;
          }
    }

  public async createPlace(placeDTO: IPlaceDTO): Promise<Result<IPlaceDTO>> {
    try {
        console.log("service "+ placeDTO.type)
      const place = await this.placeRepo.existsPlace(placeDTO.address);
      if( place === false){
      const placeOrError = await Place.create(placeDTO);

      if (placeOrError.isFailure) {
        return Result.fail<IPlaceDTO>(placeOrError.errorValue());
      }

      const placeResult = placeOrError.getValue();
      console.log("antes do save" + placeResult.type)
      await this.placeRepo.save(placeResult);

      const placeDTOResult = PlaceMap.toDTO(placeResult) as IPlaceDTO;
      return Result.ok<IPlaceDTO>(placeDTOResult)
      }else{
        return Result.fail<IPlaceDTO>("Already exists an Place");
      }
    } catch (e) {
      throw e;
    }
  }


  //mudar este metodo para fazer uma query com aqueles parametros (delete where...)
  public async disablePlace(address: string): Promise<Result<IPlaceDTO>> {
    try {
      const place = await this.placeRepo.existsPlace(address);

      if (place === null) {
        return Result.fail<IPlaceDTO>("place not found");
      }
      else {
        place.name = "Sem Nome";
        place.place = "Sem Nome";
        place.day = "aaa@aaa.com";
        place.hour = "999999999";
        place.type = " no type"
        await this.placeRepo.save(place);

        const placeDTOResult = PlaceMap.toDTO(place) as IPlaceDTO;
        return Result.ok<IPlaceDTO>(placeDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }
  public async getPlaces(): Promise<Result<IPlaceDTO[]>> {
      try{
        const place= await this.placeRepo.findAll();
      
      if (place === null) {
        return Result.fail<IPlaceDTO[]>("Place not found");
      }
      
      else{
        const placeDTOResult = [];
        for (let i = 0; i < place.length; i++) {
            const places = place[i];
            const placeDTO =PlaceMap.toDTO(places);
            placeDTOResult.push(placeDTO);
        }
        
        return Result.ok(placeDTOResult);
      }
    }catch (e) {
        throw e;
      }
  }

}
