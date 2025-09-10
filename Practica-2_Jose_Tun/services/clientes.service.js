
import Cliente from '../models/Cliente.js';

const getClientes = async () => {
  const clientes = await Cliente.find().lean(); 

  if (!clientes.length) {
    const error = new Error('DATA_NOT_FOUND');
    error.code = 'DATA_NOT_FOUND';
    throw error;
  }

  return clientes;
};

const postCliente = async (data) => {
  const { nit } = data;

  const clienteExistente = await Cliente.findOne({ nit });

  if (clienteExistente) {
    const error = new Error('DATA_EXISTS');
    error.code = 'DATA_EXISTS';
    throw error;
  }

  const nuevoCliente = await Cliente.create(data);

  return nuevoCliente._id;
};

export { getClientes, postCliente };