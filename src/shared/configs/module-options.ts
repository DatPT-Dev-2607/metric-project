import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import configuration from './configuration';
import * as Joi from 'joi';

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: '.env',
  load: [configuration],
  isGlobal: true,
  validationSchema: Joi.object({
    APP_ENVIRONMENT: Joi.string()
      .valid('local', 'develop', 'production', 'staging', 'test')
      .default('develop'),
    USER_DB_HOST: Joi.string().required(),
    USER_DB_USER: Joi.string().required(),
    USER_DB_PASSWORD: Joi.string().required(),
    USER_DB_NAME: Joi.string().required(),
    USER_DB_PORT: Joi.number().required(),
  }),
  ignoreEnvFile: false,
};
