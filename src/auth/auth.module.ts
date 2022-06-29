import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CoreModule } from "src/core/core.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';

@Module({
  imports: [CoreModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService],
})
export class AuthModule {}
