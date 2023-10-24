import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPackagingPersistence } from '../dataschema/IPackagingPersistence';

import IPackagingDTO from "../dto/IPackagingDTO";
import { Packaging } from "../domain/packaging";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
// Packaging packaging
export class PackagingMap extends Mapper<Packaging> {
  
  public static toDTO( packaging: Packaging): IPackagingDTO {
    return {
      id: packaging.id.toString(),
      boxId: packaging.boxId,
      positionX: packaging.positionX,
      positionY: packaging.positionY,
      positionZ: packaging.positionZ,
    } as IPackagingDTO;
  }

  public static toDomain (packaging: any | Model<IPackagingPersistence & Document> ): Packaging {
    const packagingOrError = Packaging.create(
      packaging,
      new UniqueEntityID(packaging.packagingId)
    );

    packagingOrError.isFailure ? console.log(packagingOrError.error) : '';

    return packagingOrError.isSuccess ? packagingOrError.getValue() : null;
  }

  public static toPersistence (packaging: Packaging): any {
    return {
      packagingId: packaging.id.toString(),
      boxId: packaging.boxId,
      positionX: packaging.positionX,
      positionY: packaging.positionY,
      positionZ: packaging.positionZ,
    }
  }
}