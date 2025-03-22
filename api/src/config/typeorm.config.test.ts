import { DataSourceOptions } from 'typeorm';
import { dataSourceOptions } from './typeorm.config';

export const testDataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'xK9#mP2$vL5nQ8jR',
  database: 'd3_db_test',
  entities: dataSourceOptions.entities,
  migrations: dataSourceOptions.migrations,
  synchronize: true, // Em testes podemos sincronizar automaticamente
  dropSchema: true, // Limpa o banco antes de cada teste
};
