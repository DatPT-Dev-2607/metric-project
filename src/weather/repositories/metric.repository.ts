import { Injectable } from '@nestjs/common';
import { MetricEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MetricRepository extends Repository<MetricEntity> {
  constructor(private dataSource: DataSource) {
    super(MetricEntity, dataSource.createEntityManager());
  }

  async getMetricsByTime(startDate: string, endDate: string) {
    return this.createQueryBuilder('metric')
      .where('metric.reportAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .distinctOn(['DATE(metric.reportAt)'])
      .orderBy('DATE(metric.reportAt)', 'ASC')
      .addOrderBy('metric.reportAt', 'DESC')
      .getMany();
  }
}
