import express, { Application, Request, Response } from 'express'
require('dotenv').config()

import routes from './api/routes'
import cors from 'cors';
const app: Application = express()
const port = 3000

//CORS
const allowedOrigins = '*';
const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(cors(options))


// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${port}/api/v1` })
})

try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
} catch (error: any) {
    console.log(`Error occurred: ${error.message}`)
}

app.use('/api/v1', routes)


