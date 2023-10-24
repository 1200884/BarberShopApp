import { Result } from "../../core/logic/Result";
import IPackagingDTO from "../../dto/IPackagingDTO";

export default interface IPackagingService  {
    patchPackaging(info: string): Result<IPackagingDTO> | PromiseLike<Result<IPackagingDTO>>;
    createPackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>>;
    updatePackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>>;
  
    getPackaging (packagingId: string): Promise<Result<IPackagingDTO>>;
    getPackagings (): Promise<Result<IPackagingDTO[]>>;
  
    patchPackaging (packagingInfo: string): Promise<Result<IPackagingDTO>>;
  }
  //Packaging packaging
