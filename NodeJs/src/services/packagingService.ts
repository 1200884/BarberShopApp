import { Service, Inject } from 'typedi';
import config from "../../config";
import IPackagingDTO from '../dto/IPackagingDTO';
import { Packaging } from "../domain/packaging";
import IPackagingRepo from '../services/IRepos/IPackagingRepo';
import IPackagingService from './IServices/IPackagingService';
import { Result } from "../core/logic/Result";
import { PackagingMap } from "../mappers/PackagingMap";
 
@Service()
export default class PackagingService implements IPackagingService {
  constructor(
      @Inject(config.repos.packaging.name) private packagingRepo : IPackagingRepo
  ) {}

  public async getPackaging( packagingId: string): Promise<Result<IPackagingDTO>> {
    try {
      //const id = packagingId.split('"')[3];
      
      const packaging = await this.packagingRepo.findByDomainId(packagingId);

      if (packaging === null) {
        return Result.fail<IPackagingDTO>("Packaging not found");
      }
      else {
        const packagingDTOResult = PackagingMap.toDTO( packaging ) as IPackagingDTO;
        return Result.ok<IPackagingDTO>( packagingDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getPackagings(): Promise<Result<IPackagingDTO[]>> {
    try {
      const packagings = await this.packagingRepo.findAll();
      var finalPackagings: Array<IPackagingDTO> = [];

      if (packagings == null) {
        return Result.fail<IPackagingDTO[]>("There was a problem assembling the Packagings");
      }
      else {
        for (var i = 0; i < packagings.length; i++) {
          finalPackagings.push(PackagingMap.toDTO( packagings[i] ) as IPackagingDTO);
        }
        return Result.ok<IPackagingDTO[]>( finalPackagings )
      }
    }catch (e) {
      throw e;
    }
  }


  public async createPackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>> {
    try {
      
      const packagingOrError = await Packaging.create( packagingDTO );
      if (packagingOrError.isFailure) {
        return Result.fail<IPackagingDTO>(packagingOrError.errorValue());
      }

      const packagingResult = packagingOrError.getValue();
      await this.packagingRepo.save(packagingResult);
      const packagingDTOResult = PackagingMap.toDTO( packagingResult ) as IPackagingDTO;
      return Result.ok<IPackagingDTO>( packagingDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updatePackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>> {
    try {
      const packaging = await this.packagingRepo.findByDomainId(packagingDTO.id);
      console.log(packaging);
      if (packaging === null) {
        return Result.fail<IPackagingDTO>("Packaging not found");
      }
      else {
        packaging.boxId = packagingDTO.boxId;
        packaging.positionX = packagingDTO.positionX;
        packaging.positionY = packagingDTO.positionY;
        packaging.positionZ = packagingDTO.positionZ;

        await this.packagingRepo.save(packaging);

        const packagingDTOResult = PackagingMap.toDTO( packaging ) as IPackagingDTO;
        return Result.ok<IPackagingDTO>( packagingDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async patchPackaging(packagingInfo: string): Promise<Result<IPackagingDTO>> {
    try {
      const info = packagingInfo.split('"');
      let vars = [info[1]];
      let vals = [info[3]];
      let cont = true;
      let v1 = 5;
      let v2 = 6;
      do {
        if (info[v1] === undefined || info[v2] === undefined) {
          cont = false;
        }else {
          vars.push(info[v1]);
          vals.push(info[v2]);
        }
        v1 += 2;
        v2 += 2;
      }while(cont);
      const packaging = await this.packagingRepo.findByDomainId(vals[0]);
      let string;
      if (packaging === null) {
        return Result.fail<IPackagingDTO>("packaging not found");
      }
      else {//Packaging packaging
        if (vars.includes("boxId")) {
          string = vals[vars.indexOf("warehouseDeparture")];
          string = string.replace(',', '');
          string = string.replace(':', '');
          string = string.replace('}', '');
          console.log(string);
          packaging.boxId = parseInt(string);
        }
        if (vars.includes("positionX")) {
          string = vals[vars.indexOf("positionX")];
          string = string.replace(',', '');
          string = string.replace(':', '');
          string = string.replace('}', '');
          packaging.positionX = parseInt(string);
        }
        if (vars.includes("positionY")) {
          string = vals[vars.indexOf("positionY")];
          string = string.replace(',', '');
          string = string.replace(':', '');
          string = string.replace('}', '');
          packaging.positionY = parseInt(string);
        }
        if (vars.includes("positionZ")) {
          string = vals[vars.indexOf("positionZ")];
          string = string.replace(',', '');
          string = string.replace(':', '');
          string = string.replace('}', '');
          packaging.positionZ = parseInt(string);
        }
            await this.packagingRepo.save(packaging);

        const packagingDTOResult = PackagingMap.toDTO( packaging ) as IPackagingDTO;
        return Result.ok<IPackagingDTO>( packagingDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }
}
