import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { Habit } from '../habit/entities/habit.entity';

export default registerAs('database.config', (): TypeOrmModuleOptions => {
  return {
    type: 'mariadb',
    host: process.env.DATABASE_HOST,
    port: +(process.env.DATABASE_PORT || 3306),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Habit],
    synchronize: true,
  };
});
