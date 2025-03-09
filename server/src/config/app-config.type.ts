import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface AppConfiguration {
  database: TypeOrmModuleOptions;
}
