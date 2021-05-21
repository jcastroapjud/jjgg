import {Pool} from 'pg';

const pool = new Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'clorofila',
    database: 'inventario_ddbb'
});

module.exports = pool;