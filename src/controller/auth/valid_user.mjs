import { response } from "../../../utils/interfaces.mjs"
import bcrypt from "bcryptjs";
import {increment} from '../../models/increment_attemps_login.mjs'

async function validUser(userData, params)
{
    if(userData.user.status != 1)
    {
        response.data = null;
        response.message="No se ha podido realizar el inicio de sesión";
        response.errorMessage="El usuario o contraseña son incorrectos.";
        response.status = false;
        response.statusCode = "2x04";
        return response;
    }

    if(userData.user.attempsLogin == 3)
    {
        response.data = null;
        response.message= "Se han superado los intentos permitidos para iniciar sesión.";
        response.errorMessage="El usuario se encuentra bloqueado, contacta al administrador";
        response.status = false;
        response.statusCode ="2x05";
        return response;
    }

    const passwordCompare = bcrypt.compareSync(params.password, userData.user.password);
    if(!passwordCompare)
    {
        userData.user.attempsLogin++;

       await increment(userData.user.attempsLogin, userData.user.userId);

        response.data = null;
        response.errorMessage = 3 - userData.user.attempsLogin == 0? "Se han superado los intentos permitidos para iniciar sesión.":`Usuario y/o contraseña incorrectos, te quedan ${3 - userData.user.attempsLogin} intentos antes de que se bloquee el usuario`;
        response.message="No se ha podido realizar el inicio de sesión";
        response.status = false;
        response.statusCode = "2x06";
        return response;
    }
    
    await increment(0,userData.user.userId);

    if(userData.company.sede.length <= 0 )
    {
        response.status = false;
        response.data= null;
        response.message="No se ha podido realizar el inicio de sesión";
        response.errorMessage ="El usuario no tiene sedes asignadas, contacte al administrador";
        response.statusCode = "2x07";
        return response;
    }
    
    return response;
}

export {validUser}