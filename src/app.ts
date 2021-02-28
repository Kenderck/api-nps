import 'reflect-metadata'; //sempre vir primeiro
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors"
import createConnection from './database'; //não precisa colocar o index.ts porque ele já sabe disso
import { router } from './routes';
import { AppError } from './errors/AppError';

createConnection();// criar um aconexão

const app = express();
app.use(express.json()); //para falar pro serviro que estamos trabalhando com json
app.use(router);

app.use((err: Error, reques: Request, response: Response, _next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: " Error",
        message: `Internal Server Error ${err.message}`
    })
})

export{ app };