import  {response}  from "../../../utils/interfaces.mjs";
import { valid } from "../../../utils/schema/login.mjs";
import { findDataUser } from "../../models/find_user.mjs";
import { generateJWT } from "./generate_token.mjs";
import { validUser } from "./valid_user.mjs";

async function loginValid(params)
{
    try {
        const validData = valid(params);
        //Validar esquema 
        if(!validData.success)
        {
            response.status = false;
            response.data = validData.error.issues;
            response.message = "Error en la peticion";
            response.errorMessage ="Error en los datos de entrada";
            response.statusCode = "2x02";

            return response;
        }

        const userData = await findDataUser(params);
        if(!userData.status){
           return userData;
        }
        
        const statusUser = await validUser(userData.data,params)
        if(!statusUser.status)
        {
            response.status = false;
            response.data = statusUser.data;
            response.message = statusUser.message;
            response.errorMessage =statusUser.errorMessage;
            response.statusCode = statusUser.statusCode;

            return response;
        }
        const user = {
            name : statusUser.data.name,
            lastName : statusUser.data.lastName,
            email : statusUser.data.email,
            role : statusUser.data.user.role

        }

        const payload = {
            userId: statusUser.data.user.userId,
            company: statusUser.data.company
        }
     
        const token = await generateJWT(payload);
        const dataResponse = {
            user: user, 
            token: token.data,
          
        }
        response.status = true;
        response.data = dataResponse;
        response.message="Ingreso autorizado";
        response.statusCode= '2x00';
        response.errorMessage ="";
        

        
        return response;
    } catch (error) {
        throw(error);
    }
}

export {loginValid}