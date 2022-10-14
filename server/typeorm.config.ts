import { join } from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    entities: [
        join(__dirname, '**/*.entity.ts')
    ],
    migrations: [
        join(__dirname, 'src/migrations/*.ts')
    ]
});