
import { responseSuccess, responseError } from '../helpers/response.helper.js';
import joi from 'joi';
import { getClientes, postCliente } from '../services/clientes.service.js';
import i18n from '../configs/i18n.config.js';

const schemaCliente = joi.object({
  primerNombre: joi.string().min(5).max(50).required(),
  segundoNombre: joi.string().optional(),
  primerApellido: joi.string().min(5).max(50).required(),
  segundoApellido: joi.string().optional(),
  nit: joi.string().required(),
  email: joi.string().email().required(),
  direcciones: joi.array().required(),
  telefonos: joi.array().required()
});

const getClientesHandler = async (req, res) => {
  try {
    const clientes = await getClientes();
    res.status(200).json(responseSuccess("Clientes obtenidos exitosamente", clientes));
  } catch (error) {
    let errorCode = 500;
    let messageKey = 'INTERNAL_SERVER_ERROR';

    switch (error.code) {
      case 'DATA_NOT_FOUND':
        errorCode = 404;
        messageKey = 'DATA_NOT_FOUND';
        break;
    }

    
    const message = i18n.__(messageKey);

    return res.status(errorCode).json(responseError(message));
  }
};

const postClienteHandler = async (req, res) => {
  try {
    const data = req.body;
    const { error, value } = schemaCliente.validate(data, { abortEarly: false });

    if (error) {
      return res.status(400).json(responseError(error.details.map(e => e.message)));
    }

    const clienteId = await postCliente(value);
    res.status(201).json(responseSuccess("Cliente guardado", clienteId));
  } catch (error) {
    console.error(error)
    let errorCode = 500;
    let messageKey = 'INTERNAL_SERVER_ERROR';

    if (error.message && error.message.includes('E11000')) {
      error.code = 409;
      messageKey = 'DATA_EXISTS';
    } else if (error.code ==="DATA_EXISTS"){
      errorCode = 409;
      messageKey = 'DATA_EXISTS';
    }

    switch (error.code) {
      case 'DATA_EXISTS':
        errorCode = 409;
        messageKey = 'DATA_EXISTS';
        break;
    }

   
    const message = i18n.__(messageKey);

    return res.status(errorCode).json(responseError(message));
  }
};

export { getClientesHandler, postClienteHandler };