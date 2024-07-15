import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {DataSource, DataSourceOptions} from "typeorm";
import {registerAs} from "@nestjs/config";

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5431,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/src/migrations/*{.ts,.js}"],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);
