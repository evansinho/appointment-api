import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema({
  start: Date,
  end: Date,
  reason: String
})

export default mongoose.model('Appointment', appointmentSchema);