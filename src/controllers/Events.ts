import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Events from '../models/Events';

const createEvent = (req: Request, res: Response, next: NextFunction) => {
    const { time, event, eventDescription } = req.body;

    const newEvent = new Events({
        event_id: new mongoose.Types.ObjectId(),
        time,
        event,
        eventDescription,
    });

    return newEvent
        .save()
        .then(newEvent => res.status(201).json({ newEvent }))
        .catch(error => res.status(500).json({ error }));
};

const getAllEvents = (req: Request, res: Response, next: NextFunction) => {
    return Events.find()
        .then(events => res.status(200).json({ events }))
        .catch(error => res.status(500).json({ error }));
};

const getEventByID = (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;

    return Events.findById(_id)
        .then(event =>
            event ? res.status(200).json({ event }) : res.status(404).json([]),
        )
        .catch(error => res.status(500).json({ error }));
};

const updateEvent = (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;

    return Events.findById(_id)
        .then(event => {
            if (event) {
                event.set(req.body);

                return event
                    .save()
                    .then(event => res.status(201).json({ event }))
                    .catch(error => res.status(500).json({ error }));
            } else {
                res.status(404).json([]);
            }
        })
        .catch(error => res.status(500).json({ error }));
};
const deleteEvent = (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;

    return Events.findByIdAndDelete(_id)
        .then(event =>
            event ? res.status(201).json({ event }) : res.status(404).json([]),
        )
        .catch(error => res.status(500).json({ error }));
};

export default {
    createEvent,
    getEventByID,
    getAllEvents,
    updateEvent,
    deleteEvent,
};
