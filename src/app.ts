import express from 'express';
import {psikologRouter} from './routes';
import { logger } from './middlewares';

const app = express();
const port = 3000 ;
console.log(`port: ${port}`);

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.ip} ${req.originalUrl}`);
    next();
    });

app.use(logger);
app.use('/psikolog', psikologRouter);

app.use((req, res, next) => {
    res.send({message: 'Hello world!'});
    }
);

app.listen(port, () => {    
    console.log(`Server started at http://localhost:${port}`);
});