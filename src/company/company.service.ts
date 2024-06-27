import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as mongoose from "mongoose";
import { SignUpDto } from "src/dto/userDto";
import { constants } from "src/helper/constants";
import { Company } from "src/interface/company.interface";
import { LoggerService } from "src/logger/logger.service";
import { PasswordService } from "src/services/password.service";

@Injectable()
export class CompanyService {
  private readonly AppName: string = "CompanyService";
  constructor(
    @Inject(constants.COMPANY_MODEL)
    private companyModel: mongoose.Model<Company>,
    private logger: LoggerService,
    private jwtService: JwtService,
    private passwordService: PasswordService
  ) {}

  async companySignUp(signUpCompany: SignUpDto): Promise<Company> {
    this.logger.log(
      `companySignUp started with email - ${signUpCompany?.email}`,
      `${this.AppName}`
    );
    try {
      const company = await this.companyModel
        .findOne({
          email: signUpCompany.email,
        })
        .lean()
        .exec();
      if (company) {
        this.logger.error(
          `Company allready found for this email - ${signUpCompany.email}`,
          `${this.AppName}`
        );
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: "Company found for this email",
          },
          HttpStatus.BAD_REQUEST
        );
      }
      const hashedPassword = await this.passwordService.hashPassword(
        signUpCompany.password
      );
      signUpCompany.password = hashedPassword;
      const createCompany = new this.companyModel(signUpCompany);
      return await createCompany.save();
    } catch (err) {
      this.logger.error(
        `companySignUp failed with email - ${signUpCompany?.email} with error ${err}`,
        `${this.AppName}`
      );
      throw new HttpException(
        {
          status: err?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
          message: err?.message ?? "Something went wrong",
        },
        err?.status ?? HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
