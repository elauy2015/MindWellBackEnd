import express from 'express'
import { config } from 'dotenv'
import morgan from 'morgan'
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

config();
const app = express();

//middlewares
app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Eliminar en produccion
app.use(morgan("dev"))

app.use('/api/v1', appRouter)

export default app