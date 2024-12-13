import { DistanceUnit } from '@shared/constants';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetMetricsOutputDto {
  @Expose()
  id: string;

  @Expose()
  distance: number;

  @Expose()
  distanceUnit: DistanceUnit;

  @Expose()
  temperature: number;

  @Expose()
  temperatureUnit: string;

  @Expose()
  userId: string;

  @Expose()
  reportAt: Date;
}
