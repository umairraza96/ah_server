import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HashModule } from './hash/hash.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, HashModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}