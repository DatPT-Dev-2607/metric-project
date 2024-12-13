import { BadRequestException, Injectable } from '@nestjs/common';
import { MetricRepository } from './repositories/metric.repository';
import {
  GetMetricsByTimeQueryDto,
  GetMetricsOutputDto,
  GetMetricsQueryDto,
  ReportMetricInputDto,
} from './dtos';
import { UserRepository } from './repositories/user.repository';
import { convertDistance, convertTemperature } from '@shared/utils/common';
import { plainToInstance } from 'class-transformer';
import { temperatureUnitMap } from '@shared/constants/common';
import { MetricEntity } from './entities';

@Injectable()
export class WeatherService {
  constructor(
    private readonly metricRepository: MetricRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async reportMetric(input: ReportMetricInputDto): Promise<void> {
    // Todo all exception filter
    const user = await this.userRepository.findOneBy({ id: input.userId });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    await this.metricRepository.insert(
      this.metricRepository.create({
        ...input,
        temperatureUnit: temperatureUnitMap[input.temperatureUnit],
      }),
    );
  }

  async getMetrics(
    queries: GetMetricsQueryDto,
  ): Promise<GetMetricsOutputDto[]> {
    const { distanceUnit, temperatureUnit } = queries;

    // Todo all exception filter
    const metrics = await this.metricRepository.find();

    const response = metrics.map((metric: MetricEntity) => {
      if (distanceUnit) {
        metric.distance = convertDistance(
          metric.distance,
          metric.distanceUnit,
          distanceUnit,
        );
        metric.distanceUnit = distanceUnit;
      }
      if (temperatureUnit) {
        metric.temperature = convertTemperature(
          metric.temperature,
          metric.temperatureUnit,
          temperatureUnitMap[temperatureUnit],
        );
        metric.temperatureUnit = temperatureUnitMap[temperatureUnit];
      }

      return metric;
    });

    return plainToInstance(GetMetricsOutputDto, response);
  }

  async getMetricsByTime(
    queries: GetMetricsByTimeQueryDto,
  ): Promise<GetMetricsOutputDto[]> {
    const { distanceUnit, temperatureUnit, startDate, endDate } = queries;

    const startTime = new Date(startDate);
    startTime.setUTCHours(0, 0, 0, 0);
    const endTime = new Date(endDate);
    endTime.setUTCHours(23, 59, 59, 999);

    // Todo all exception filter
    const metrics = await this.metricRepository.getMetricsByTime(
      startTime.toISOString(),
      endTime.toISOString(),
    );

    const response = metrics.map((metric) => {
      if (distanceUnit) {
        metric.distance = convertDistance(
          metric.distance,
          metric.distanceUnit,
          distanceUnit,
        );
        metric.distanceUnit = distanceUnit;
      }
      if (temperatureUnit) {
        metric.temperature = convertTemperature(
          metric.temperature,
          metric.temperatureUnit,
          temperatureUnitMap[temperatureUnit],
        );
        metric.temperatureUnit = temperatureUnitMap[temperatureUnit];
      }

      return metric;
    });

    return plainToInstance(GetMetricsOutputDto, response);
  }
}
