import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    "type": "mysql",
    "host": "db",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "ambassador",
    "synchronize": true,
    "logging": false,
    "entities": [
        "src/entity/*.ts"
    ]

})