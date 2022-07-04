import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CoreModule } from "src/core/core.module";
import { AgenciesController } from "./agencies.controller";
import { AgenciesService } from "./agencies.service";
import { Agency, AgencySchema } from "./dto/agency.entity";

@Module({
  imports: [CoreModule, MongooseModule.forFeature([{ name: Agency.name, schema: AgencySchema }])],
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}
