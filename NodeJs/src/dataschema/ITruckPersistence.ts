
export interface ITruckPersistence {
  domainId: string;
  plate: string;
  tare: number;
  maxWeight: number;
  batteryCapacity: number;
  truckAutonomy: number;
  chargeTime: number;
  active: boolean;
}