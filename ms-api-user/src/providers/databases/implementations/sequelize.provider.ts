/*import { Sequelize } from "sequelize-typescript";
import { UserEntity } from "../../../models/user/user.entity";

const sequelizeConnection = new Sequelize({
    database: 'mms_user',
    dialect: 'postgres',
    username: 'postgres',
    password: 'Postgres2021!',
    logging: false,
    pool: {
        max: 3,
        min: 1
    },
    models: [UserEntity]
});

sequelizeConnection.sync().catch((e) => {
    return;
})

export { sequelizeConnection }*/
import { Sequelize } from "sequelize-typescript";
import { UserEntity } from "../../../models/user/user.entity";

const sequelizeConnection = new Sequelize({
    database: 'swm_database', // O banco criado no seu docker-compose
    dialect: 'mysql',         // Corrigir de postgres para mysql
    username: 'swm_user',     // Usuário que você configurou no Docker
    password: 'senha',        // Senha que você configurou
    host: 'localhost',        // Ou o IP se estiver rodando fora do Docker
    port: 3307,               // Porta que você expôs no Docker (host:3307 -> container:3306)
    logging: false,
    pool: {
        max: 3,
        min: 1
    },
    models: [UserEntity]
});

sequelizeConnection.sync().catch((e) => {
    console.error('[MICRO-USUARIO] Erro ao sincronizar banco:', e);
    return;
});

export { sequelizeConnection };

