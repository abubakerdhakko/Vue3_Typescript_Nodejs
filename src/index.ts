import express, { Request, Response } from "express";
import cors from "cors"
import { createConnection } from "typeorm";
import { routes } from "./routes";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import {AppDataSource} from "../app-data-source"

dotenv.config();

// createConnection().then(() => {


//     const app = express();
//     app.use(cors({
//         origin: ['http://localhost:3000']
//     }))
//     app.use(cookieParser())
//     app.use(express.json())

//     routes(app)

//     app.get('/', (req: Request, res: Response) => {
//         res.send('hello world')
//     })
//     app.listen(8000, () => {
//         console.log('listening to port 8000')
//     });
// })
// const AppDataSource = new DataSource({
//     "type": "mysql",
//     "host": "db",
//     "port": 3306,
//     "username": "root",
//     "password": "root",
//     "database": "ambassador",
//     "synchronize": true,
//     "logging": false,
//     "entities": [
//         "src/entity/*.ts"
//     ]

// })

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        createConnection().then(() => {


            const app = express();
            app.use(cors({
                origin: ['http://localhost:3000']
            }))
            app.use(cookieParser())
            app.use(express.json())

            routes(app)

            app.get('/', (req: Request, res: Response) => {
                res.send('hello world')
            })
            app.listen(8000, () => {
                console.log('listening to port 8000')
            });
        })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })






