import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UtilsService } from "src/core/utils/utils.service";
import { EntityNotFoundError, Repository } from "typeorm";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { Trip } from "./entities/trip.entity";

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    private readonly utilsService: UtilsService,
  ) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    const trip = this.tripRepository.create(createTripDto);
    trip.id = this.utilsService.createGUID();
    await this.tripRepository.save(trip);
    return trip;
  }

  async findAll() {
    return await this.tripRepository.find();
  }

  async findOne(id: string) {
    const trip = await this.tripRepository.findOneBy({ id: id });
    if (!trip) throw new EntityNotFoundError(Trip, id);
    return trip;
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const trip = await this.findOne(id);
    const updated = {
      ...trip,
      ...updateTripDto,
    };
    return await this.tripRepository.save(updated);
  }

  async remove(id: string) {
    const trip = await this.findOne(id);
    return await this.tripRepository.remove(trip);
  }
}
