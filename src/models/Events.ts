import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent {
    event_id: string;
    time: string;
    event: string;
    eventDescription: string;
}

export interface IEventModel extends IEvent, Document {}

const EventSchema: Schema = new Schema(
    {
        event_id: { type: String, required: true },
        time: { type: String, required: true },
        event: { type: String, required: true },
        eventDescription: { type: String, required: true },
    },
    {
        versionKey: false,
    },
);

export default mongoose.model<IEventModel>('Events', EventSchema);
