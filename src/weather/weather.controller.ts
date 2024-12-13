import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import {
  GetMetricsByTimeQueryDto,
  GetMetricsOutputDto,
  GetMetricsQueryDto,
  ReportMetricInputDto,
} from './dtos';

@Controller('weathers')
export class WeatherController {
  constructor(private readonly service: WeatherService) {}

  @Post('/')
  async reportMetric(@Body() input: ReportMetricInputDto) {
    await this.service.reportMetric(input);

    //Todo base response
    return { data: { message: 'Report metric success.' } };
  }

  @Get('/')
  async getMetrics(
    @Query() queries: GetMetricsQueryDto,
  ): Promise<{ data: { metrics: GetMetricsOutputDto[] } }> {
    const response = await this.service.getMetrics(queries);

    //Todo base response
    return { data: { metrics: response } };
  }

  @Get('/metrics-by-time')
  async getMetricsByTime(
    @Query() queries: GetMetricsByTimeQueryDto,
  ): Promise<{ data: { metrics: GetMetricsOutputDto[] } }> {
    const response = await this.service.getMetricsByTime(queries);

    //Todo base response
    return { data: { metrics: response } };
  }
}
