const bookingService = require('../services/booking.service');

async function bookAppointment(req, res, next) {
  try {
    const appointment = await bookingService.bookAppointment(req.user.id, req.body);
    res.status(201).json({ success: true, message: 'Appointment booked', data: appointment });
  } catch (error) {
    next(error);
  }
}

async function getMyAppointments(req, res, next) {
  try {
    const appointments = await bookingService.getMyAppointments(req.user.id, req.user.role);
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    next(error);
  }
}

module.exports = { bookAppointment, getMyAppointments };