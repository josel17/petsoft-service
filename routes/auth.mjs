import express from 'express';
const router = express.Router();
import  { check } from 'express-validator';
import {validate} from '../middleware/validBody.mjs'

import {login} from '../src/view/auth/login.mjs'

 
 /**
  * @swagger
  * /api/auth/login:
  *   post:
  *     summary: Autenticarse en la app
  *     tags:
  *      - auth
  *     description: Endpoint para autenticarse con usuario y contraseña.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               jsonBody:
  *                 type: string
   *     responses:
  *       200:
  *         description: Éxito
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:              
  *                  status:
  *                      type: boolean
  *                  data:
  *                      type: object
  *                  message: 
  *                      type: string
  *                  errorMessage:
  *                      type: string
  *                  statusCode:
  *                      type: string
  *                      
  *       400:
  *         description: Solicitud incorrecta
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:              
  *                  status:
  *                      type: boolean
  *                      enum:
  *                          - false
  *                  data:
  *                      type: object
  *                  message: 
  *                      type: string
  *                  errorMessage:
  *                      type: string
  *                  statusCode:
  *                      type: string
  */
router.post('/login',
check("bodyData", "La informacion suministrada no es valida")
.not().isEmpty(),
validate,
login)

export {router as authRoute}