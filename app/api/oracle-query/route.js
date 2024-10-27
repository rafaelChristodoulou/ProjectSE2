const oracledb = require('oracledb');

async function connectToDB() {
    try {
        const connection = await oracledb.getConnection({
            user: 'sys',
            password: '',
            connectionString: 'localhost:1521/orcl',
            privilege: oracledb.SYSDBA // Use SYSDBA privilege
        });
        console.log("Successfully connected to the database");
        return connection;
    } catch (err) {
        console.error("Error connecting to the database", err);
    }
}
