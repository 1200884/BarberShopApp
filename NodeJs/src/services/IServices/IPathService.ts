import { Result } from "../../core/logic/Result";
import IPathDTO from "../../dto/IPathDTO";

export default interface IPathService  {
  patchPath(info: string): Result<IPathDTO> | PromiseLike<Result<IPathDTO>>;
  createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  updatePath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;

  getPath (pathId: string): Promise<Result<IPathDTO>>;
  getPaths (): Promise<Result<IPathDTO[]>>;

  patchPath (pathInfo: string): Promise<Result<IPathDTO>>;
}
