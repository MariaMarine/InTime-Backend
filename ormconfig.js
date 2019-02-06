module.exports = {
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'bpyll5mgtrsgcj65ekye-mysql.services.clever-cloud.com',
    port: +process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'uzcc5awtawlmpmduq2a0',
    password: process.env.DB_PASSWORD || 'si9jFPApPk8kWBChnoZR',
    database: process.env.DB_DATABASE_NAME,
    synchronize: false,
    entities: [
        'src/data/entities/**/*.entity.ts',
    ],
    migrations: [
        'src/data/migrations/**/*.ts',
    ],
    cli: {
        entitiesDir: 'src/data/entities',
        migrationsDir: 'src/data/migrations',
    },
}
