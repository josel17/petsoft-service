import jwt from 'jsonwebtoken';
import { response } from '../../../utils/interfaces.mjs';
import { decryptText } from '../../../utils/crypto-tools.mjs';

const generateJWT = async(data) =>
{
    return new Promise((resolve, reject) =>
    {
        const payload = ({data});
        
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn:'24h',
        },(err,token) =>
        {
            if(!err)
            {
                response.data = token;
                response.errorMessage = "";
                response.message ="Ok";
                response.status = true;
                response.statusCode = "Ok";
                resolve(response);
            }else{
                response.data = null;
                response.errorMessage = err;
                response.message ="Error en el servicio";
                response.status = false;
                response.statusCode = "2x07";
                reject(response);
            }
        });
    });
};



const verifyJWT = async (req, res) =>
{
    try {
        return new Promise((resolve, reject) =>
        {
            let bearerHeader = req.headers['authorization'];
            if(typeof bearerHeader !== 'undefined')
            {
                const bearerToken = bearerHeader.split(" ")[1];
                req.token = bearerToken;

                jwt.verify(req.token, process.env.SECRET_JWT_SEED, (err,data) =>
                {
                   if(err)
                   {
                    response.status = false;
                    response.statusCode = "500";
                    response.message="Token no valido"
                    response.data=null;
                    response.errorMessage ="Token no valido";
                    reject(response);

                   }else{
                    response.status = true,
                    response.data = decryptText({bodyData:data.data});
                    response.message ="";
                    response.errorMessage ="";
                    response.statusCode = "";
                    resolve(response);
                   }
                });
            } else{
                response.status = false;
                response.data = null;
                response.message ="Token no valido";
                response.errorMessage="No se ha proporcionado el token de autenticación.";
                response.statusCode = "2x10";
                reject(response);
            }
        })
    } catch (error) {
        response.status = false;
        response.errorMessage = error;
        response.message = "Error en el servicio";
        response.data = null;
        response.statusCode = "2x08";
        reject(response);
    }
    
}

export {generateJWT, verifyJWT};