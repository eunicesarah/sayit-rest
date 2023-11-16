import express from 'express';
import {psikologRouter, userRouter} from './routes';
import { logger } from './middlewares';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000 ;
const cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  allowedOrigins: ['http://localhost:3001']
};
const accessValidation = (req: any, res: any, next: any) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({
            message: 'Token diperlukan untuk mengakses halaman ini'
        }); 
    }
    const token = authorization.split(' ')[1];
    const secret = process.env.JWT_SECRET!;
    try{
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error){
        return res.status(401).json({
            message: 'Token tidak valid'
        });

    };
}

console.log(`port: ${port}`);

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.ip} ${req.originalUrl}`);
    next();
    });

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use('/psikolog', psikologRouter);
app.use('/user', accessValidation,userRouter);


app.use((req, res, next) => {
    res.send({message: 'Hello world!'});
    }
);

app.listen(port, () => {    
    console.log(`Server started at https://localhost:${port}`);
});