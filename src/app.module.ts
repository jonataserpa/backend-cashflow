import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { AuthModule } from '@application/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { GoogleMapsModule } from '@infra/google-maps/google-maps.module';

@Module({
  imports: [
    HttpModule,
    GoogleMapsModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
  ],
  providers: [],
})
export class AppModule {}
