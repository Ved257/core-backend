import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { LoggerModule } from "src/logger/logger.module";
import { MongodbModule } from "src/mongodb/mongodb.module";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { constants } from "../helper/constants";
import { Connection } from "mongoose";
import { User } from "src/interface/user.interface";
import { userSchema } from "src/schemas/user.schema";
import { Company } from "src/interface/company.interface";
import { companySchema } from "src/schemas/company.schema";
import { PasswordService } from "src/services/password.service";

@Module({
  imports: [
    MongodbModule,
    LoggerModule,
    JwtModule.register({
      global: true,
      secret: constants.jwt_secret_key,
    }),
  ],
  controllers: [CompanyController],
  providers: [
    {
      provide: constants.COMPANY_MODEL,
      useFactory: async (connection: Connection) => {
        return await connection.model<Company>("company", companySchema);
      },
      inject: [constants.DATABASE_CONNECTION],
    },
    PasswordService,
    CompanyService,
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
