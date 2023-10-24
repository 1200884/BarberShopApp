import mongoose from 'mongoose';
import { ITravelsPersistence } from '../../dataschema/ITravelsPersistence';

const TravelsSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        date: { type: Number, unique: true },
        travels: { type: [[String]], unique: false }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITravelsPersistence & mongoose.Document>('Travels', TravelsSchema);
