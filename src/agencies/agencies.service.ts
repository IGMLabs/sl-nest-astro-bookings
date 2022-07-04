import { Injectable } from "@nestjs/common";
import { UtilsService } from "src/core/utils/utils.service";
import { AgencyDto } from "./dto/agency.dto";
import { Agency } from "./dto/agency.interface";

@Injectable()
export class AgenciesService {
  private readonly agencies: Agency[] = [];

  constructor(private utilsService: UtilsService) {}

  public selectAll(): Agency[] {
    return this.agencies;
  }

  public findById(id: string): Agency {
    return this.agencies.find((agency) => agency.id === id);
  }

  public insert(agency: AgencyDto): Agency {
    const newAgency = {
      id: this.utilsService.createGUID(),
      ...agency,
    };
    this.agencies.push(newAgency);
    return newAgency;
  }
}
