import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PackagingId } from "./packagingId";

import IPackagingDTO from "../dto/IPackagingDTO";

interface PackagingProps {
  boxId: number;
  positionX : number;
  positionY : number;
  positionZ : number;
}

export class Packaging extends AggregateRoot<PackagingProps> {
  get id (): UniqueEntityID {
    return this._id;
  }
  get packagingId (): PackagingId {
    return new PackagingId(this.packagingId.toValue());
  }
  get boxId (): number {
    return this.props.boxId;
  }
  get positionX (): number {
    return this.props.positionX;
  }
  get positionY (): number {
    return this.props.positionY;
  }
  get positionZ (): number {
    return this.props.positionZ;
  }

  set boxId ( value: number) {
    this.props.boxId = value;
  }
  set positionX ( value: number) {
    this.props.positionX = value;
  }
  set positionY ( value: number) {
    this.props.positionY = value;
  }
  set positionZ ( value: number) {
    this.props.positionZ = value;
  }


  private constructor (props: PackagingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (packagingDTO: IPackagingDTO, id?: UniqueEntityID): Result<Packaging> {
    const boxId =packagingDTO.boxId;
    const positionX =packagingDTO.positionX;
    const positionY =packagingDTO.positionY;
    const positionZ =packagingDTO.positionZ;

    if (!(positionX > 0 || positionY > 0 || positionZ > 0 || positionX < 10 || positionY < 20 || positionZ < 8)) {
      return Result.fail<Packaging>('Must provide positions within the range')
    } else {
      const packaging = new Packaging({ boxId: boxId, positionX: positionX, positionY: positionY, positionZ: positionZ }, id);
      return Result.ok<Packaging>( packaging )
    }
  }
}
