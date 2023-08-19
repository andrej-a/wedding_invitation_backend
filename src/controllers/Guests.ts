import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Guest from '../models/Guests';

const createGuest = (req: Request, res: Response, next: NextFunction) => {
    const { name, numberOfGuests, gender, status, drinks } = req.body;

    const newGuest = new Guest({
        guest_id: new mongoose.Types.ObjectId(),
        name,
        numberOfGuests,
        status,
        gender,
        drinks,
    });

    return newGuest
        .save()
        .then(newGuest => res.status(201).json({ newGuest }))
        .catch(error => res.status(500).json({ error }));
};

const getAllGuests = (req: Request, res: Response, next: NextFunction) => {
    return Guest.find()
        .then(guest => res.status(200).json({ guest }))
        .catch(error => res.status(500).json({ error }));
};

const deleteGuest = (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;

    return Guest.findByIdAndDelete(_id)
        .then(guest =>
            guest ? res.status(201).json({ guest }) : res.status(404).json([]),
        )
        .catch(error => res.status(500).json({ error }));
};

const updateGuest = (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;

    return Guest.findById(_id)
        .then(guest => {
            if (guest) {
                guest.set(req.body);

                return guest
                    .save()
                    .then(guest => res.status(201).json({ guest }))
                    .catch(error => res.status(500).json({ error }));
            } else {
                res.status(404).json([]);
            }
        })
        .catch(error => res.status(500).json({ error }));
};

export default {
    createGuest,
    getAllGuests,
    deleteGuest,
    updateGuest,
};
