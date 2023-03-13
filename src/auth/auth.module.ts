import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { HashModule } from 'src/hash/hash.module';

@Module({
  imports: [JwtModule.register({}), UserModule, HashModule],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
})
export class AuthModule {}
