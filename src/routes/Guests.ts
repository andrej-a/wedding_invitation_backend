import express from 'express';
import controller from '../controllers/Guests';

const router = express.Router();
const { getAllGuests, createGuest, deleteGuest, updateGuest } = controller;

router.post('/createGuest', createGuest);
router.get('/getAllGuests', getAllGuests);
router.delete('/deleteGuest', deleteGuest);
router.patch('/updateGuest', updateGuest);

export = router;
