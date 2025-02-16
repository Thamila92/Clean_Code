import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package
import { CardHandler } from './routes/cardRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; 

app.use(cors());

app.use(bodyParser.json());

CardHandler(app);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger API documentation available at http://localhost:${PORT}/api-docs`);
});