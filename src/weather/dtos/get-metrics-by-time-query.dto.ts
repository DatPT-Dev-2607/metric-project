import { IsDateString } from 'class-validator';
import { GetMetricsQueryDto } from '.';
import { IsStartDateBeforeEndDate } from '@shared/validations';

export class GetMetricsByTimeQueryDto extends GetMetricsQueryDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  @IsStartDateBeforeEndDate()
  endDate: Date;
}
