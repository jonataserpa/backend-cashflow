import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyService } from './strategies/jwt/jwt-strategy.service';
import { LocalStrategy } from './strategies/local/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth-case';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { RefreshTokenStrategy } from './strategies/jwt/refresh-token-strategy.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategyService,
    PrismaService,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
