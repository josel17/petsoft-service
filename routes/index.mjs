import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Ruta raiz de la api
 *     parameters:
 *       - in: query
 *         name: parametro
 *         required: true
 *         description: Descripción del parámetro de consulta
 *         schema:
 *           type: string
 *     description: 
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             example:
 *               mensaje: ss
 */

router.get('/',(req,res) =>{
    //console.log(req);
    res.status(200).send({message:"Bienvenido a la API de prueba"})
})

 

export {router as indexRouter };