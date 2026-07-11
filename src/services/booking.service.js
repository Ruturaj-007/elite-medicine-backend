const prisma = require('../config/prisma');
const ApiError = require('../utils/ApiError');

async function bookAppointment(patientId, { slotId, idempotencyKey }) {
  // idempotency check first - if this exact request was already processed, return the same result
  const existing = await prisma.appointment.findUnique({ where: { idempotencyKey } });
  if (existing) {
    return existing;
  }

  const slot = await prisma.availability.findUnique({ where: { id: slotId } });
  if (!slot) {
    throw new ApiError(404, 'Availability slot not found');
  }
  if (slot.isBooked) {
    throw new ApiError(409, 'This slot is already booked');
  }

  // transaction: both writes succeed together, or neither does
  const appointment = await prisma.$transaction(async (tx) => {
    const updatedSlot = await tx.availability.updateMany({
      where: { id: slotId, isBooked: false }, // re-check inside transaction - prevents race condition
      data: { isBooked: true },
    });

    if (updatedSlot.count === 0) {
      throw new ApiError(409, 'This slot was just booked by someone else');
    }

    return tx.appointment.create({
      data: {
        patientId,
        doctorId: slot.doctorId,
        slotId,
        idempotencyKey,
        status: 'SCHEDULED',
      },
    });
  });

  return appointment;
}

async function getMyAppointments(userId, role) {
  const where = role === 'DOCTOR'
    ? { doctor: { userId } }
    : { patientId: userId };

  return prisma.appointment.findMany({
    where,
    include: {
      slot: true,
      doctor: { include: { user: { select: { name: true, email: true } } } },
      patient: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

module.exports = { bookAppointment, getMyAppointments };