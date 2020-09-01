import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule], //modules required by this module
  controllers: [], //controllers required by this module
  providers: [],  // Array of providers, services come here
  exports: [] //Array of services which can be accessed from other modules
})
export class AppModule {}
