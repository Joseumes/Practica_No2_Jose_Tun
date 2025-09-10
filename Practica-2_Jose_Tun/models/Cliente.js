
import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  primerNombre: { type: String, required: true, minlength: 5, maxlength: 50 },
  segundoNombre: { type: String, optional: true },
  primerApellido: { type: String, required: true, minlength: 5, maxlength: 50 },
  segundoApellido: { type: String, optional: true },
  nit: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  direcciones: [{ type: String }],
  telefonos: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Cliente', clienteSchema);