
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' }
}, { timestamps: true });

export default mongoose.model('Usuario', usuarioSchema);