import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  reason: String
})

export default mongoose.model('Appointment', appointmentSchema);