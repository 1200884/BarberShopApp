import { Service, Inject } from 'typedi';

import IPackagingRepo from "../services/IRepos/IPackagingRepo";
import { Packaging } from "../domain/packaging";
import { PackagingId } from "../domain/packagingId";
import { PackagingMap } from "../mappers/PackagingMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPackagingPersistence } from '../dataschema/IPackagingPersistence';
import IPackagingDTO from '../dto/IPackagingDTO';


@Service()
export default class PackagingRepo implements IPackagingRepo {
  private models: any;

  constructor(
    @Inject('packagingSchema') private packagingSchema : Model<IPackagingPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(packaging: Packaging): Promise<boolean> {
    
    const idX = packaging.id instanceof PackagingId ? (<PackagingId>packaging.id).toValue() : packaging.id;

    const query = { packagingId: idX}; 
    const packagingDocument = await this.packagingSchema.findOne( query as FilterQuery<IPackagingPersistence & Document>);

    return !!packagingDocument === true;
  }

  public async save (packaging: Packaging): Promise<Packaging> {
    const query = { packagingId: packaging.id.toString()}; 

    const packagingDocument = await this.packagingSchema.findOne( query );

    try {
      if (packagingDocument === null ) {
        const rawPackaging: any = PackagingMap.toPersistence(packaging);

        const packagingCreated = await this.packagingSchema.create(rawPackaging);

        return PackagingMap.toDomain(packagingCreated);
      } else {
        packagingDocument.boxId = packaging.boxId;
        packagingDocument.positionX = packaging.positionX;
        packagingDocument.positionY = packaging.positionY;
        packagingDocument.positionZ = packaging.positionZ;
        await packagingDocument.save();

        return packaging;
      }
    } catch (err) {
      throw err;
    }
  }
//Packaging packaging 
  public async findByDomainId (packagingId: PackagingId | string): Promise<Packaging> {
    const query = { packagingId: packagingId};
    const packagingRecord = await this.packagingSchema.findOne( query as FilterQuery<IPackagingPersistence & Document> );
    console.log(packagingId +"\n"+ packagingRecord);
    if( packagingRecord != null) {
      return PackagingMap.toDomain(packagingRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Packaging[]> {
    const packagingRecord = await this.packagingSchema.find();

    if( packagingRecord != null) {
      var packagingsArray: Array<Packaging> = [];
      for (var i = 0; i < packagingRecord.length; i++) {
        packagingsArray.push(PackagingMap.toDomain(packagingRecord[i]));
      }
      return packagingsArray;
    }
    else
      return null;
  }
}