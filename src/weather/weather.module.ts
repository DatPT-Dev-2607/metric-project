import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricRepository } from './repositories';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { Module } from '@nestjs/common';
import { MetricEntity, UserEntity } from './entities';
import { UserRepository } from './repositories/user.repository';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, MetricRepository, UserRepository],
  imports: [TypeOrmModule.forFeature([MetricEntity, UserEntity])],
})
export class WeatherModule {}
