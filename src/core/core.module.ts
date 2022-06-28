import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MonitorMiddleware } from './middlewares/monitor.middleware';

@Module({})
export class CoreModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(MonitorMiddleware).forRoutes('*');
  }
}
