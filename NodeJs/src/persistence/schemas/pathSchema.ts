import { IPathPersistence } from '../../dataschema/IPathPersistence';
import mongoose from 'mongoose';

const PathSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    warehouseDeparture: { type: Number, unique: false },
    warehouseDestination: { type: Number, unique: false},
    distance: { type: Number, unique: false},
    travelTime: { type: Number, unique: false},
    energyNecessary: { type: Number, unique: false},
    additionalTime: { type: Number, unique: false}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPathPersistence & mongoose.Document>('Path', PathSchema);
