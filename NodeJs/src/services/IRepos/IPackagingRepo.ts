import { Repo } from "../../core/infra/Repo";
import { Packaging } from "../../domain/packaging";
import { PackagingId } from "../../domain/packagingId";
//Packaging packaging
export default interface IPackagingRepo extends Repo<Packaging> {
  save(packaging: Packaging): Promise<Packaging>;
  findByDomainId (packaginghId: PackagingId | string): Promise<Packaging>;
  findAll (): Promise<Packaging[]>;
}
