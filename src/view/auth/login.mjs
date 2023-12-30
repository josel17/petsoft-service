
import {response} from '../../../utils/interfaces.mjs';
import { decryptText, encryptText } from "../../../utils/crypto-tools.mjs";
import { loginValid } from "../../controller/auth/login.mjs";

const login = async (req,res) =>
{
    try {
        const dataDecrypted  = decryptText(req.body);
        const loginResponse = await loginValid(dataDecrypted);
        
        response.data = loginResponse.data;
        response.errorMessage = loginResponse.errorMessage;
        response.message = loginResponse.message;
        response.status = loginResponse.status;
        response.statusCode = loginResponse.statusCode;

    } catch (error) {
        response.status = true;
        response.data = null;
        response.errorMessage =error.message;
        response.message = "Error en el servicio";
        response.statusCode = "2x01";
        
    }
    const dataEncrypted = encryptText(response);
    return res.status(200).json(response);
}

export {login}