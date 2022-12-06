import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';

export default registerAs('database.config', (): TypeOrmModuleOptions => {
  return {
    type: 'mariadb',
    host: process.env.DATABASE_HOST,
    port: +(process.env.DATABASE_PORT || 3306),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true,
    logging: 'all',
    logger: 'advanced-console',
  };
});
