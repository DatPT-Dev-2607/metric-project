import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { configModuleOptions } from './shared/configs/module-options';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllEntitySubscriber } from './shared/typeorm/all-entity-subscriber';
import { WeatherModule } from './weather/weather.module';
import { MetricEntity, UserEntity } from './weather/entities';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.get<string>('database.user'),
        host: configService.get<string>('database.host'),
        database: configService.get<string>('database.name'),
        password: configService.get<string>('database.password'),
        port: parseInt(configService.get<string>('database.port'), 10),
        entities: [UserEntity, MetricEntity],
        timezone: 'Z',
        synchronize: false,
        autoLoadEntities: true,
        subscribers: [AllEntitySubscriber],
        extra: {
          trustServerCertificate: true,
        },
        logging: configService.get<string>('env') === 'local',
      }),
    }),
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
