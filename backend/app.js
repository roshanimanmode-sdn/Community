import express from 'express';
import cors from 'cors';
import { mongoconnection } from './db';
import bodyParser from 'body-parser';
import usersRouter from './routes/user'; // Use the default import

const app = express();
mongoconnection();

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));

app.use('/user', usersRouter); // Add a route prefix to make it clear

export default app;
