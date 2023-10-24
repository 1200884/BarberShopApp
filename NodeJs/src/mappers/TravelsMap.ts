import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';

import ITruckDTO from "../dto/ITruckDTO";
import { Truck } from "../domain/truck";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Travels } from "../domain/travels";
import ITravelsDTO from "../dto/ITravelsDTO";
import { ITravelsPersistence } from "../dataschema/ITravelsPersistence";

export class TravelsMap extends Mapper<Travels> {

    public static toDTO(travels: Travels): ITravelsDTO {
        return {
            id: travels.id.toString(),
            date: travels.date,
            travels: travels.travels
        } as ITravelsDTO;
    }

    public static toDomain(travels: any | Model<ITravelsPersistence & Document>): Travels {
        const travelsOrError = Travels.create(
            travels,
            new UniqueEntityID(travels.domainId)
        );

        travelsOrError.isFailure ? console.log(travelsOrError.error) : '';

        return travelsOrError.isSuccess ? travelsOrError.getValue() : null;
    }

    public static toDomainFromPlanning(date: number, travels: [[string]]): Travels {
        const travelsOrError = Travels.createNew(
            date,
            travels,
            new UniqueEntityID()
        );

        travelsOrError.isFailure ? console.log(travelsOrError.error) : '';

        return travelsOrError.isSuccess ? travelsOrError.getValue() : null;
    }

    public static toPersistence(travels: Travels): any {
        return {
            id: travels.id.toString(),
            date: travels.date,
            travels: travels.travels
        }
    }
}