import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
//import { UserId } from "./userId";
//import { UserEmail } from "./userEmail";
//import { Role } from "../domain/role";
import { Guard } from "../core/logic/Guard";
import { IPlaceDTO } from "../dto/IPlaceDTO";


interface PlaceProps {
    name: string;
    address: string;
    type: string;
    image: string;
}

export class Place extends AggregateRoot<PlaceProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get name (): string {
    return this.props.name
  }

  get address (): string {
    return this.props.address;
  }

  get type (): string {
    return this.props.type;
  }

  get image (): string {
    return this.props.image;
  }

  
  set name (value: string) {
    this.props.name = value;
  }

  set address (value: string) {
    this.props.address = value;
  }

  set image (value: string) {
    this.props.image = value;
  }
  set type (value: string) {
    this.props.type = value;
  }



  private constructor (props: PlaceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (placeDTO: IPlaceDTO, id?: UniqueEntityID): Result<Place> {

    const name =placeDTO.name;
    const address =placeDTO.address;
    const image =placeDTO.image;
    const type =placeDTO.type;
    console.log("type do objeto é "+type)

    /*if (email.length==0) {
      return Result.fail<Appointment>('The email cannot be empty')
    } 
    if (!email.includes('@')) {
      return Result.fail<Appointment>('The email needs to have the @ character')
    }*/
    const place = new Place({ name: name, address: address, type: type, image: image})
    console.log("place djiiddiw"+place.type)
    return Result.ok<Place>(place)
  }

  public static createFromBD(placeDTO: IPlaceDTO, id?: UniqueEntityID): Result<Place> {
    const name = placeDTO.name;
    console.log(name)
    const address = placeDTO.address;
    const image = placeDTO.image;
    const type = placeDTO.type;
      const place = new Place({ name: name, address: address, type: type, image:image}, id)
      return Result.ok<Place>(place)  
  }
}