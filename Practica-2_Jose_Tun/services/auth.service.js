
import { issueAccessToken } from '../helpers/auth.helper.js';
import Usuario from '../models/Usuario.js';

const login = async (data) => {
  const { email, password } = data;

  const usuarioValido = await Usuario.findOne({ email, password });

  if (!usuarioValido) {
    const error = new Error('AUTH_ERROR');
    error.code = 'AUTH_ERROR';
    throw error;
  }

  const token = await issueAccessToken({ sub: usuarioValido._id, role: usuarioValido.role });

  return {
    token,
    role: usuarioValido.role,
  };
};

export { login };