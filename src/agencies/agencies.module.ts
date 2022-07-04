import { Module } from "@nestjs/common";
import { CoreModule } from "src/core/core.module";
import { AgenciesController } from "./agencies.controller";
import { AgenciesService } from "./agencies.service";

@Module({
  imports: [CoreModule],
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}
