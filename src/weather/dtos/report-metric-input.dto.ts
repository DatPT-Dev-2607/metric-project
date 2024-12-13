import { DistanceUnit, TemperatureUnit } from '@shared/constants';
import { IsEnum, IsNumber, IsString, Length, Min } from 'class-validator';

export class ReportMetricInputDto {
  @IsNumber()
  @Min(0)
  distance: number;

  @IsEnum(DistanceUnit)
  distanceUnit: DistanceUnit;

  @IsNumber()
  temperature: number;

  @IsEnum(TemperatureUnit)
  temperatureUnit: TemperatureUnit;

  @IsString()
  @Length(26, 26)
  userId: string;
}
