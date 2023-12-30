
import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import bodyParser from 'body-parser';
//const bodyParser = require('body-parser');

import {userRoute} from './routes/person.mjs';
import {indexRouter} from './routes/index.mjs';
import {authRoute} from './routes/auth.mjs';
import {securityRoute} from './routes/security.mjs';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.mjs';


const app = express();
app.use(bodyParser.json());


app.use(cors());


app.use('/', indexRouter);
app.use('/api/auth', authRoute);
app.use('/user', userRoute);

app.use('/api/cryptography',securityRoute);


app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));

 


const port = process.env.PORT ;


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
