import express from 'express';
import cors from 'cors';
import { mongoconnection } from './db';
import bodyParser from 'body-parser';
// import User from './routes/User'


const app = express();
mongoconnection();

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

app.use(bodyParser.json({ limit: "50mb" }));

// app.use("/user", User);
// app.use("/uploads",express.static("uploads"));


export default app;
