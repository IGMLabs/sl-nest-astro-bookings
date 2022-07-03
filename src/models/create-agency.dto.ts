import { IsNotEmpty, IsString } from "class-validator";
import { Agency } from "src/agencies/dto/agency.entity";

export class AgencyDto implements Partial<Agency> {
  @IsNotEmpty()
  @IsString()
  name: string;
}
