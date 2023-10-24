import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";
import { Document, Model } from 'mongoose';

import { User } from "../domain/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/userEmail";

import RoleRepo from "../repos/roleRepo";
import { IUserPersistence } from '../dataschema/IUserPersistence';

export class UserMap extends Mapper<User> {

  public static toDTO( user: User): IUserDTO {
    return {
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
    } as IUserDTO;
  }

  public static toDomain (raw: any | Model<IUserPersistence & Document>): User {
    //console.log("todomain")
    //console.log("raw "+raw.firstName)
    const userOrError = User.createFromBD(raw, new UniqueEntityID(raw.domainId));
    userOrError.isFailure ? console.log(userOrError.error) : '';
    //console.log(userOrError )
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence (user: User): any {
    const a = {
      domainId: user.id.toString(),
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    }
    return a;
  }
}