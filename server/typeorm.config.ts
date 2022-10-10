import { join } from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'eagool',
    entities: [
        join(__dirname, '**/*.entity.ts')
    ],
    migrations: [
        join(__dirname, 'src/migrations/*.ts')
    ]
});