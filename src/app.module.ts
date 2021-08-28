import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { AppointmentsModule } from './appointments/appointments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { configValidationSchema } from './config.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TerminusModule,
    HttpModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get(
          'DB_USERNAME',
        )}:${configService.get('DB_PASSWORD')}@${configService.get(
          'DB_HOST',
        )}/${configService.get('DB_DATABASE')}`,
        useNewUrlParser: true,
        useFindAndModify: false,
      }),
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isDev = configService.get('STAGE') === 'dev';
        return {
          typePaths: ['./**/*.graphql'],
          playground: isDev,
          debug: isDev,
        };
      },
    }),
    AppointmentsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
