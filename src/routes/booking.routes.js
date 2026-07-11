const express = require('express');
const controller = require('../controllers/booking.controller');
const protect = require('../middlewares/auth.middleware');
const restrictTo = require('../middlewares/rbac.middleware');
const validate = require('../middlewares/validate.middleware');
const { bookAppointmentSchema } = require('../validations/booking.validation');

const router = express.Router();

router.post('/', protect, restrictTo('PATIENT'), validate(bookAppointmentSchema), controller.bookAppointment);
router.get('/my', protect, controller.getMyAppointments);

module.exports = router;