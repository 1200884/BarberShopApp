import { AggregateRoot } from "../core/domain/AggregateRoot";

import { Result } from "../core/logic/Result";
import IDeliveryDTO from "../dto/IDeliveryDTO";

interface DeliveryProps {
    deliveryId: string;
    date: Date;
    weight: number;
    warId: string;
    loadTime: number;
    unloadTime: number;
}

export class Delivery extends AggregateRoot<DeliveryProps> {
  get deliveryId (): string {
    return this.props.deliveryId;
  }
  
  set deliveryId ( value: string) {
    this.props.deliveryId = value;
  }

  get date (): Date {
    return this.props.date;
  }

  set date ( value: Date) {
    this.props.date = value;
  }

  get weight (): number {
    return this.props.weight;
  }

  set weight ( value: number) {
    this.props.weight = value;
  }

  get warId (): string {
    return this.props.warId;
  }

  set warId ( value: string) {
    this.props.warId = value;
  }

  get loadTime (): number {
    return this.props.loadTime;
  }

  set loadTime ( value: number) {
    this.props.loadTime = value;
  }

  get unloadTime (): number {
    return this.props.unloadTime;
  }

  set unloadTime ( value: number) {
    this.props.unloadTime = value;
  }

  private constructor (props: DeliveryProps) {
    super(props);
  }

  public static create (deliveryDTO: IDeliveryDTO): Result<Delivery> {
    const deliveryId = deliveryDTO.deliveryId;
    const date = deliveryDTO.date;
    const weight = deliveryDTO.weight;
    const warId = deliveryDTO.warId;
    const loadTime = deliveryDTO.loadTime;
    const unloadTime = deliveryDTO.unloadTime;

    if (loadTime < 0 || unloadTime < 0) {
      return Result.fail<Delivery>('Must provide positive data')
    } else {
      const delivery = new Delivery({ deliveryId: deliveryId, date: date, weight: weight, warId: warId, loadTime: loadTime, unloadTime: unloadTime});
      return Result.ok<Delivery>( delivery )
    }
  }
}
