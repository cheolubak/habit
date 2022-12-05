import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
