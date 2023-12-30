
import {response} from '../../../utils/interfaces.mjs';
import {setParams, decryptText, encryptText } from '../../../utils/crypto-tools.mjs';

const encrypt = (req, res) =>{
    try {
        //setParams("AES256",process.env.KEY, process.env.IV);
        
        const dataEncrypt = encryptText(req.body);

        response.status = true
        response.data = dataEncrypt;
        response.message ="Ok";
        response.errorMessage ="";
        response.statusCode ="Ok"

        return res.status(200).json(dataEncrypt);
    } catch (error) {
        response.status = false
        response.data = null;
        response.message ="Error en el servicio";
        response.errorMessage =error.message;
        response.statusCode ="1x01"
        return res.status(500).json(response);
    }
}

const decrypt = (req, res = response) =>{
    try {
        
        const dataDecrypted = decryptText(req.body);

        response.status = true
        response.data = dataDecrypted;
        response.message ="Ok";
        response.errorMessage ="";
        response.statusCode ="Ok"

        return res.status(200).json(dataDecrypted);
    } catch (error) {
        response.status = false
        response.data = null;
        response.message ="Error en el servicio";
        response.errorMessage =error.message;
        response.statusCode ="1x01"
        return res.status(500).json(response);
  
    }
}

export {
    encrypt,
    decrypt
}