import { mysqlConnection } from "../../utils/mysql_connection.mjs";

async function increment(attemps, userId)
{
    try {
        const query = `UPDATE ps_user SET attemps_login = ? WHERE user_id = ?`;
        const queryRsp = await mysqlConnection(query, [attemps,userId]);
        return true;

    } catch (error) {
        throw(error);
    }
}

export {increment};