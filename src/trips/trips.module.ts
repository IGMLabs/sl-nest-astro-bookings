import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoreModule } from "src/core/core.module";
import { Trip } from "./entities/trip.entity";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([Trip])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
