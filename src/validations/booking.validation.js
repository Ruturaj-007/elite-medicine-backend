const { z } = require('zod');

const bookAppointmentSchema = z.object({
  slotId: z.string().uuid(),
  idempotencyKey: z.string().min(10, 'idempotencyKey is required (use a UUID from the client)'),
});

module.exports = { bookAppointmentSchema };