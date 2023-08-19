import mongoose, { Document, Schema } from 'mongoose';

type GuestStatus = 'not checked' | 'checked' | 'confirm' | 'canceled';

export interface IGuest {
    guest_id: string;
    name: string;
    guests: string;
    numberOfGuests: string;
    gender: string;
    status: GuestStatus;
    drinks: string[];
}

export interface IGuestsModel extends IGuest, Document {}

const GuestsSchema: Schema = new Schema(
    {
        guest_id: { type: String, required: true },
        name: { type: String, required: true },
        guests: { type: String, required: false },
        numberOfGuests: { type: String, required: true },
        gender: { type: String, required: false },
        status: { type: String, required: true },
        drinks: { type: Array, required: true },
    },
    {
        versionKey: false,
    },
);

export default mongoose.model<IGuestsModel>('Guest', GuestsSchema);
