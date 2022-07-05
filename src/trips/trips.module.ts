import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "src/bookings/entities/booking.entity";
import { CoreModule } from "src/core/core.module";
import { Trip } from "./entities/trip.entity";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([Trip, Booking])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
