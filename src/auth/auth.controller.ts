import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Credentials } from "./models/credentials.interface";
import { LoginDto } from "./models/login.dto";
import { RegistrationDto } from "./models/registration.dto";
import { User } from "./models/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("registration")
  public async postRegistration(@Body() registration: RegistrationDto): Promise<Credentials> {
    return await this.authService.register(registration);
  }

  @Post("login")
  public async postLogin(@Body() login: LoginDto): Promise<Credentials> {
    return await this.authService.login(login);
  }

  @Get("me")
  @UseGuards(AuthGuard("jwt"))
  public async getCurrentUser(@Req() req: any): Promise<User> {
    // return "Hello " + req.user;
    const userId = req.user;
    return await this.authService.getUser(userId);
  }
}
