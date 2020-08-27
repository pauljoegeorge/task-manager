import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule], //modules required by this module
  controllers: [], //controllers required by this module
  providers: [],  // Array of providers, services come here
  exports: [] //Array of services which can be accessed from other modules
})
export class AppModule {}
