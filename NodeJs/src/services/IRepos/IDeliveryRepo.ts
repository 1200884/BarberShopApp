import { Repo } from "../../core/infra/Repo";
import { Delivery } from "../../domain/delivery";

export default interface IDeliveryRepo extends Repo<Delivery> {
    findAll(): Promise<Delivery[]>;
    findByDomainId(deliveryId: string): Promise<Delivery>;
}