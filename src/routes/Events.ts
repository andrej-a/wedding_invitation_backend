import express from 'express';
import controller from '../controllers/Events';

const router = express.Router();
const { createEvent, getAllEvents, getEventByID, updateEvent, deleteEvent } =
    controller;

router.post('/createEvent', createEvent);
router.get('/get', getAllEvents);
router.get('/getEventByID', getEventByID);
router.patch('/updateEvent', updateEvent);
router.delete('/deleteEvent', deleteEvent);

export = router;
