import express from 'express';
import { check } from 'express-validator';
import { validate } from '../middleware/validBody.mjs';
const router = express.Router();

console.info("La ruta users se esta utilizando");

/**
 * @swagger
 * /api/person/regist:
 *   post:
 *     summary: Encriptar una cadena
 *     tags:
 *     description: Web service to register data person
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        type: apiKey
 *        description: Token de autorización (Bearer token)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dataBody:
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

router.get('/regist',check("bodyData","La informacion suministrada no es valida")
.not().isEmpty(),
validate);
export {router as userRoute};