const dbCfg = {
    HOST: process.env.MYSQL_HOST,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    PORT: process.env.MYSQL_PORT,
    DB: process.env.MYSQL_DB_NAME,
    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000,
    },
};

export default dbCfg;
