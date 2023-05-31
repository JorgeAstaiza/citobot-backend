const mysql = require('mysql');

const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'citobottest.cp0scrkpp9ro.us-east-2.rds.amazonaws.com',
	port: 3306,
	user: 'cito_admin',
	password: 'C1t0b0t2023*',
	database: 'citobottest'
});
const dbConnection = async () => {
	pool.getConnection((err, connection) => {
		if (err) {
			throw err;
		} else {
			console.log('DB is connected');
		}
	});
};

// const dbConnection = async() => {
//     try {
//         const db = await mysql.createConnection({
//             host     : '212.1.208.101:3306',
//             user     : 'u214255937_citobot_admin',
//             password : 'k3D/MZOZ3A$',
//             database: 'u214255937_citobot'
//         });
//         db.connect((err) => {
//             if (err) {
//                 console.log('error');
//                 return;
//             }
//             console.log('base de datos conectado');
//         })
//     } catch (error) {
//         throw new Error('Error conexion base de datos');
//     }
// }

module.exports = {
	pool,
	dbConnection
};
