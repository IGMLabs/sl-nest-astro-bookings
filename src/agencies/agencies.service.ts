import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UtilsService } from "src/core/utils/utils.service";
import { AgencyDto } from "src/models/create-agency.dto";
import { Agency } from "./dto/agency.entity";

@Injectable()
export class AgenciesService {
  private readonly agencies: Agency[] = [];

  constructor(private utilsService: UtilsService,
    @InjectModel(Agency.name) private readonly agencyModel: Model<Agency>){
  }

  public selectAll(): Agency[] {
    return this.agencies;
  }

  public findById(id: string): Agency {
    return this.agencies.find((agency) => agency.id === id);
  }

  public async insert(agency: AgencyDto): Promise<Agency> {
    const newAgency: Agency = await this.agencyModel.create({
      id: this.utilsService.createGUID(),
      ...agency,
    });
    await newAgency.save();
    return newAgency;
  }
}
