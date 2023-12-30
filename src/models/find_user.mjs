import  { mysqlConnection } from '../../utils/mysql_connection.mjs';
import { response } from '../../utils/interfaces.mjs';

async function findDataUser(parameters)
{
    const query = `SELECT JSON_OBJECT(
        'id', ps_person.id,
        'name', ps_person.full_name,
        'lastName', CONCAT(ps_person.last_name_1," ",ps_person.last_name_2),
        'documentType', ps_document_type.code,
        'documentNumber',ps_person.document_number,
        'email', ps_person.email,
        'company',(
            SELECT
                    JSON_OBJECT(
                        'id',ps_company.id,
                        'name',ps_company.NAME,
                        'container',ps_company.container,
                        'logo',ps_company.logo_url,
                        'sede',(SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id',ps_sede.id,
                                    'name',ps_sede.name
                                )) FROM ps_sede 
																INNER JOIN ps_sede_x_user ON ps_sede_x_user.sede_id = ps_sede.id
																INNER JOIN ps_user ON ps_user.user_id = ps_person.id
																WHERE ps_user.id = ps_sede_x_user.user_id AND ps_sede.status = 1 AND ps_sede_x_user.status = 1)) 
                FROM
                    ps_company
                WHERE ps_company.id = ps_person.company_id AND ps_company.status = 1
                ),
				'user',(
						SELECT JSON_OBJECT(
                            'userId',ps_user.id,
							'username',ps_person.document_number,
							'password',ps_user.password,
							'needChangePassword',ps_user.need_change_password,
							'attempsLogin',ps_user.attemps_login,
							'status',ps_user.status,
							'role',(
								SELECT JSON_OBJECT('roleId',ps_role.id,'roleName',ps_role.name,'sections',(SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id',ps_section.id,
                        'title',ps_section.title,
                        'label',ps_section.label, 
                        'url',ps_section.url, 
                        'icon',ps_section.icon, 
                        'orderBy',ps_section.order_by))
                        FROM ps_section 
                        INNER JOIN ps_section_x_role ON ps_section_x_role.section_id = ps_section.id WHERE ps_section_x_role.role_id = ps_role.id AND ps_section.status = 1)))) 
						FROM ps_user
						INNER JOIN ps_user_x_role ON ps_user_x_role.user_id = ps_user.id
						INNER JOIN ps_role ON ps_role.id = ps_user_x_role.role_id
						WHERE ps_user_x_role.status = 1 AND ps_user.user_id = ps_person.id
						)
        ) AS jsonResponse
        FROM
        ps_person
        INNER JOIN ps_document_type ON ps_document_type.id = ps_person.document_type_id
        WHERE ps_person.document_number = ?`;

    try {
        const queryRsp = await mysqlConnection(query,[parameters.username]);
        if(queryRsp.length ==0)
        {
            response.status=false;
            response.data=null;
            response.message="No se ha podido realizar el inicio de sesión";
            response.errorMessage="El usuario o contraseña son incorrectos.";
            response.statusCode="2x03";
        }else{
            response.status=true;
            response.data=queryRsp[0].jsonResponse;
            response.message="";
            response.errorMessage="";
            response.statusCode="Ok";
        }
        return response;

    } catch (error) {
        throw(error);
    }
}

export {findDataUser};