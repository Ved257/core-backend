import { Controller, HttpCode, Post } from "@nestjs/common";
import { ResponseMessage } from "src/decorators/responseMessageDecator";
import { LoggerService } from "src/logger/logger.service";
import { LoginService } from "./login.service";

@Controller("login")
export class LoginController {
  private readonly AppName: string = "LoginController";
  constructor(
    private readonly loginService: LoginService,
    private logger: LoggerService
  ) {}

  @HttpCode(200)
  @Post("/auth/google")
  @ResponseMessage("Token verified successfully")
  async verifyGoogleToken() {}
}
