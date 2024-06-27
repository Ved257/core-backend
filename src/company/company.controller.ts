import {
  Body,
  Controller,
  HttpCode,
  Post,
  Headers,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ResponseMessage } from "src/decorators/responseMessageDecator";
import { SignUpDto } from "src/dto/userDto";
import { constants } from "src/helper/constants";
import { Company } from "src/interface/company.interface";
import { LoggerService } from "src/logger/logger.service";
import { CompanyService } from "./company.service";

@Controller("company")
export class CompanyController {
  private readonly AppName: string = "CompanyController";
  constructor(
    private readonly companyService: CompanyService,
    private logger: LoggerService
  ) {}

  @HttpCode(201)
  @Post("/signup")
  @ResponseMessage("Company Created Successfully")
  async companySignup(
    @Body() signUpCompany: SignUpDto,
    @Headers("secret") headers
  ): Promise<Company> {
    this.logger.log(
      `companySignup started with email - ${signUpCompany?.email}`,
      `${this.AppName}`
    );
    if (headers !== constants?.secret) {
      this.logger.error(
        `companySignup authentication failed with secret passed - ${headers}`,
        `${this.AppName}`
      );
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: "Authorization Failed",
        },
        HttpStatus.UNAUTHORIZED
      );
    }
    return await this.companyService.companySignUp(signUpCompany);
  }
}
