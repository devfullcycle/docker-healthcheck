import mysql, {ResultSetHeader} from 'mysql2';
import databaseConfig from "./config";

const queryDatabase = async (sql: string, values?: any[]) => {

    let connection = mysql.createConnection(databaseConfig.config);

    const queryPromise = new Promise<any>((resolve, reject) => {
        connection.query<ResultSetHeader>(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    try {
        const [queryResults] = await Promise.all([queryPromise]);
        return queryResults;
    } finally {
        connection.end();
    }
};

export default queryDatabase;