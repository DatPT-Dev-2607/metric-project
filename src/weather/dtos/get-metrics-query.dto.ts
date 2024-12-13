import { DistanceUnit, TemperatureUnit } from '@shared/constants';
import { IsEnum, IsOptional } from 'class-validator';

export class GetMetricsQueryDto {
  @IsOptional()
  @IsEnum(DistanceUnit)
  distanceUnit: DistanceUnit;

  @IsOptional()
  @IsEnum(TemperatureUnit)
  temperatureUnit: TemperatureUnit;
}
