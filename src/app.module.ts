import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { AuthModule } from '@application/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { GoogleMapsModule } from '@infra/google-maps/google-maps.module';
import { OpenAiModule } from '@infra/open-ai/open-ai.module';
import { ReplicateModule } from '@infra/replicate-ai/replicate.module';

@Module({
  imports: [
    HttpModule,
    GoogleMapsModule,
    AuthModule,
    DatabaseModule,
    OpenAiModule,
    ReplicateModule,
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
