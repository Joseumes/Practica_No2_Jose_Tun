import express from 'express';
import routes from './routes/index.route.js';
import dotenv from 'dotenv';
import { connectDB } from "./configs/mongoose.config.js"
import i18n from './configs/i18n.config.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(i18n.init); // Inicializa i18n

app.use("/", routes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Servidor iniciado en puerto ${port}`));
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

startServer();