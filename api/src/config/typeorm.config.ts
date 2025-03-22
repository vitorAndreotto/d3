import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'xK9#mP2$vL5nQ8jR',
  database: process.env.DB_DATABASE || 'd3_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false, // Desativado em produção
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
