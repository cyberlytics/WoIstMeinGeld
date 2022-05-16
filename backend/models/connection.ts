import mysql from "mysql";
import dbCfg from "../config/db.config";

const connection = mysql.createConnection({
    host: dbCfg.HOST,
    user: dbCfg.USER,
    password: dbCfg.PASSWORD,
    database: dbCfg.DB,
});

connection.connect((error) => {
    if (error) throw error;
    console.log("Successfully connected with database");
});

export default connection;
