import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UtilsService } from "src/core/utils/utils.service";
import { Credentials } from "./models/credentials.interface";
import { LoginDto } from "./models/login.dto";
import { RegistrationDto } from "./models/registration.dto";
import { User } from "./models/user.interface";

@Injectable()
export class AuthService {
  private readonly users: User[] = [];

  constructor(private readonly utilsService: UtilsService, private readonly jwtService: JwtService) {}

  public register(registration: RegistrationDto): Credentials {
    const user: User = {
      id: this.utilsService.createGUID(),
      ...registration,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return this.buildCredentials(user);
  }

  public login(login: LoginDto) {
    const user: User = this.users.find((u) => u.email === login.email && u.password === login.password);
    if (!user) throw new Error("Invalid credentials");
    return this.buildCredentials(user);
  }

  private buildCredentials(user: User): Credentials {
    const credentials: Credentials = {
      id: user.id,
      token: this.createToken(user),
    };
    return credentials;
  }
  private createToken(user: User): string {
    const payload = {
      sub: user.id,
    };
    const jwtConfig = { expiresIn: "5m", secret: "secret" };
    return this.jwtService.sign(payload, jwtConfig);
    // return JSON.stringify(payload);
  }
}
