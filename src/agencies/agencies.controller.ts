import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AgenciesService } from "./agencies.service";
import { ApiKeyGuard } from "./api-key.guard";
import { AgencyDto } from "./dto/agency.dto";
import { Agency } from "./dto/agency.interface";

@Controller("agencies")
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
  getAll(): Agency[] {
    return this.agenciesService.selectAll();
  }

  @Get("/:id")
  getById(@Param("id") id: string) {
    return this.agenciesService.findById(id);
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  postAgency(
    @Body()
    agency: AgencyDto,
  ): Agency {
    return this.agenciesService.insert(agency);
  }
}
