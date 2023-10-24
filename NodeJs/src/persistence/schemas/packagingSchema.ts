import { IPackagingPersistence } from '../../dataschema/IPackagingPersistence';
import mongoose from 'mongoose';
// Packaging packaging
/*
      packagingId: packaging.id.toString(),
      boxId: packaging.boxId,
      positionX: packaging.positionX,
      positionY: packaging.positionY,
      positionZ: packaging.positionZ,*/
const PackagingSchema = new mongoose.Schema(
  {
    packagingId: { type: String, unique: true },
    boxId: { type: Number, unique: true },
    positionX: { type: Number, unique: false },
    positionY: { type: Number, unique: false},
    positionZ: { type: Number, unique: false}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPackagingPersistence & mongoose.Document>('Packaging', PackagingSchema);
