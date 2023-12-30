import express from 'express';
const route = express.Router();
import {encrypt, decrypt} from '../src/view/security/cryptography.mjs';
import  { check } from 'express-validator';
import {validate} from '../middleware/validBody.mjs'

/**
 * @swagger
 * /api/cryptography/encrypt:
 *   post:
 *     summary: Encriptar una cadena
 *     tags:
 *      - Security
 *     description: Endpoint para encriptar una cadena utilizando AES.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cadena:
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

route.post('/encrypt',encrypt)

/**
 * @swagger
 * /api/cryptography/decrypt:
 *   post:
 *     summary: Desencriptar una cadena 
 *     tags:
 *      - Security
 *     description: Endpoint para desencriptar una cadena utilizando AES.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bodyData:
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

route.post('/decrypt',[
    check("bodyData", "La informacion suministrada no es valida")
    .not()
      .isEmpty(),
    validate
  ],decrypt) 

export {route as securityRoute}