
import { responseSuccess, responseError } from '../helpers/response.helper.js';
import joi from 'joi';
import { login } from '../services/auth.service.js';
import { verifyAccessToken } from '../helpers/auth.helper.js';
import i18n from '../configs/i18n.config.js';

const schemaAuth = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(1).max(100)
});

const loginHandler = async (req, res) => {
  try {
    const data = req.body;
    const { error, value } = schemaAuth.validate(data, { abortEarly: false });

    if (error) {
      return res.status(400).json(responseError(error.details.map(e => e.message)));
    }

    const result = await login(value);
    res.status(200).json(responseSuccess("Login successful", result));
  } catch (error) {
    console.error(error)  //depuracion
    let errorCode = 500;
    let messageKey = 'INTERNAL_SERVER_ERROR';

    switch (error.code) {
      case 'AUTH_ERROR':
        errorCode = 401;
        messageKey = 'AUTH_ERROR';
        break;
      default:
        messageKey = 'INTERNAL_SERVER_ERROR';
    }

    
    const message = i18n.__(messageKey);

    return res.status(errorCode).json(responseError(message));
  }
};

const verifyTokenHandler = () => {
  return async (req, res, next) => {
    try {
      const auth = req.header('Authorization');
      const token = auth ? auth.split(' ')[1] : null;

      if (!token) {
        return res.status(401).json(responseError('Bearer token no enviado'));
      }

      await verifyAccessToken(token);
      next();
    } catch (err) {
      return res.status(401).json(responseError('TOKEN_INVALID'));
    }
  };
};

export { loginHandler, verifyTokenHandler };