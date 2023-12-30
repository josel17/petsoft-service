
import mysql from 'mysql2/promise';
async function mysqlConnection(query, params) {
	const objectConnection =
	{
		host:process.env.HOST,
		user:process.env.USER,
		password:process.env.PASSWORD,
		database:process.env.DATABASE,	
		multipleStatements: true
	}
	const connection = await mysql.createConnection(objectConnection);
	try {
		
		console.log('Connection established with ID: ' + connection.threadId)

		if (params) {
			query = mysql.format(query, params);
		}

		let execQueryRsp;
		await connection.beginTransaction();
	
		execQueryRsp = await connection.execute(query);
		
		await connection.commit();
		await connection.end();
		console.log('The connection No. ' + connection.threadId + "has ended");
		return Promise.resolve(execQueryRsp[0]);
	} catch (error) {
		await connection.rollback();
		console.log("Rollback...");
		await connection.end();
		return Promise.reject(new Error(error));
	}
}



export {mysqlConnection}



