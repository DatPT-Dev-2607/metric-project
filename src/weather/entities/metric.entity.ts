import { TemperatureSymbol } from '@shared/constants/common';
import { DistanceUnit } from 'src/shared/constants';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('metrics')
export class MetricEntity extends BaseEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'distance', type: 'float4' })
  distance: number;

  @Column({ name: 'distance_unit' })
  distanceUnit: DistanceUnit;

  @Column({ name: 'temperature', type: 'float4' })
  temperature: number;

  @Column({ name: 'temperature_unit' })
  temperatureUnit: TemperatureSymbol;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'report_at' })
  reportAt: Date;
}
