import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UtilsService } from "src/core/utils/utils.service";
import { Credentials } from "./models/credentials.interface";
import { LoginDto } from "./models/login.dto";
import { RegistrationDto } from "./models/registration.dto";
import { User } from "./models/user.entity";

@Injectable()
export class AuthService {
  // private readonly users: User[] = [];

  constructor(
    private readonly utilsService: UtilsService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async register(registration: RegistrationDto): Promise<Credentials> {
    const user: User = await this.userModel.create({
      id: this.utilsService.createGUID(),
      ...registration,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // this.users.push(user);
    await user.save();
    return this.buildCredentials(user);
  }

  public async login(login: LoginDto): Promise<Credentials> {
    // const user: User = this.users.find((u) => u.email === login.email && u.password === login.password);
    const user: User = await this.userModel.findOne(login);
    if (!user) throw new Error("Invalid credentials");
    return this.buildCredentials(user);
  }

  public async getUser(id: string): Promise<User> {
    const user: User = await this.userModel.findOne({ id: id });
    if (!user) throw new Error("Not Found");
    return user;
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
