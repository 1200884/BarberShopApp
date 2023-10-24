import { Service, Inject } from 'typedi';
import config from "../../config";
import IPathDTO from '../dto/IPathDTO';
import { Path } from "../domain/path";
import IPathRepo from '../services/IRepos/IPathRepo';
import IPathService from './IServices/IPathService';
import { Result } from "../core/logic/Result";
import { PathMap } from "../mappers/PathMap";

@Service()
export default class PathService implements IPathService {
  constructor(
      @Inject(config.repos.path.name) private pathRepo : IPathRepo
  ) {}

  public async getPath(pathId: string): Promise<Result<IPathDTO>> {
    
    try {
      const path = await this.pathRepo.findByDomainId(pathId);

      if (path === null) {
        return Result.fail<IPathDTO>("Path not found");
      }
      else {
        const pathDTOResult = PathMap.toDTO(path) as IPathDTO;
        return Result.ok<IPathDTO>(pathDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async getPaths(): Promise<Result<IPathDTO[]>> {
    try {
      const paths = await this.pathRepo.findAll();
      var finalPaths: Array<IPathDTO> = [];

      if (paths == null) {
        return Result.fail<IPathDTO[]>("There was a problem assembling the Pathss");
      }
      else {
        for (var i = 0; i < paths.length; i++) {
          finalPaths.push(PathMap.toDTO(paths[i]) as IPathDTO);
        }
        return Result.ok<IPathDTO[]>(finalPaths)
      }
    } catch (e) {
      throw e;
    }
  }


  public async createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {
      
      const pathOrError = await Path.create( pathDTO );

      if (pathOrError.isFailure) {
        return Result.fail<IPathDTO>(pathOrError.errorValue());
      }

      const pathResult = pathOrError.getValue();

      await this.pathRepo.save(pathResult);

      const pathDTOResult = PathMap.toDTO( pathResult ) as IPathDTO;
      return Result.ok<IPathDTO>( pathDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
    try {
      const path = await this.pathRepo.findByDomainId(pathDTO.id);

      if (path === null) {
        return Result.fail<IPathDTO>("Path not found");
      }
      else {
        path.warehouseDeparture = pathDTO.warehouseDeparture;
        path.warehouseDestination = pathDTO.warehouseDestination;
        path.distance = pathDTO.distance;
        path.travelTime = pathDTO.travelTime;
        path.energyNecessary = pathDTO.energyNecessary;
        path.additionalTime = pathDTO.additionalTime;
        await this.pathRepo.save(path);

        const pathDTOResult = PathMap.toDTO( path ) as IPathDTO;
        return Result.ok<IPathDTO>( pathDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async patchPath(pathInfo: string): Promise<Result<IPathDTO>> {
    try {
      const info = pathInfo.split('"');
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
      const path = await this.pathRepo.findByDomainId(vals[0]);
      let string;
      if (path === null) {
        return Result.fail<IPathDTO>("Path not found");
      }
      else {
        if (vars.includes("warehouseDeparture")) {
          string = vals[vars.indexOf("warehouseDeparture")];
          string = string.replace(',', '');
          string = string.replace(':', '');
          string = string.replace('}', '');
          console.log(string);
          path.warehouseDeparture = parseInt(string);
        }
        if (vars.includes("warehouseDestination")) {
          string = vals[vars.indexOf("warehouseDestination")];
          string = string.replace(',', '');
          string = string.replace(':', '');
          string = string.replace('}', '');
          path.warehouseDestination = parseInt(string);
        }
        if (vars.includes("distance")) {
          string = vals[vars.indexOf("distance")];
          string = string.replace(',', '');
          string = string.replace(':', '');
          string = string.replace('}', '');
          path.distance = parseInt(string);
        }
        if (vars.includes("travelTime")) {
          string = vals[vars.indexOf("travelTime")];
          string = string.replace(',', '');
          string = string.replace(':', '');
          string = string.replace('}', '');
          path.travelTime = parseInt(string);
        }
        if (vars.includes("energyNecessary")) {
          string = vals[vars.indexOf("energyNecessary")];
          string = string.replace(',', '');
          string = string.replace(':', '');
          string = string.replace('}', '');
          path.energyNecessary = parseInt(string);
        }
        if (vars.includes("additionalTime")) {
            string = vals[vars.indexOf("additionalTime")];
            string = string.replace(',', '');
            string = string.replace(':', '');
            string = string.replace('}', '');
            path.additionalTime = parseInt(string);}
            await this.pathRepo.save(path);

        const pathDTOResult = PathMap.toDTO( path ) as IPathDTO;
        return Result.ok<IPathDTO>( pathDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }
}
