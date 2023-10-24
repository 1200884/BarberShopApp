import { ITruckPersistence } from '../../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    plate: { type: String, unique: true},
    tare: { type: Number, unique: false },
    maxWeight: { type: Number, unique: false},
    batteryCapacity: { type: Number, unique: false},
    truckAutonomy: { type: Number, unique: false},
    chargeTime: { type: Number, unique: false},
    active: { type: Boolean, unique: false}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);
