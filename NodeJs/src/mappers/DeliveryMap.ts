import { Mapper } from "../core/infra/Mapper";
import { Delivery } from "../domain/delivery";

import { Planning } from "../domain/planning";
import IDeliveryDTO from "../dto/IDeliveryDTO";
import IPlanningDTO from "../dto/IPlanningDTO";

export class DeliveryMap extends Mapper<Delivery> {

    public static toDTO(delivery: Delivery): IDeliveryDTO {
        return {
            deliveryId: delivery.deliveryId,
            date: delivery.date,
            weight: delivery.weight,
            warId: delivery.warId,
            loadTime: delivery.loadTime,
            unloadTime: delivery.unloadTime
        } as IDeliveryDTO;
    }

    public static toDomain(delivery: any): Delivery {
        const deliveryOrError = Delivery.create(
            delivery
        );

        deliveryOrError.isFailure ? console.log(deliveryOrError.error) : '';

        return deliveryOrError.isSuccess ? deliveryOrError.getValue() : null;
    }

    public static toPersistence(delivery: Delivery): any {
        return {
            deliveryId: delivery.deliveryId,
            date: delivery.date,
            weight: delivery.weight,
            warId: delivery.warId,
            loadTime: delivery.loadTime,
            unloadTime: delivery.unloadTime
        }
    }
}