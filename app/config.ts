import dotenv from 'dotenv';

dotenv.config();


const databaseConfig = {
    config: {
        host: process.env.MYSQL_URL || 'database',
        user: process.env.MYSQL_USERNAME || 'root',
        password: process.env.MYSQL_ROOT_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'nodedb'
    }
};

export default databaseConfig;