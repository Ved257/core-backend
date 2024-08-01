import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoggerService } from "src/logger/logger.service";
import axios, { AxiosResponse } from "axios";

@Injectable()
export class GoogleLoginService {
  private readonly AppName: string = "GoogleLoginService";
  constructor(private readonly logger: LoggerService) {}

  async verifyToken(token: string): Promise<AxiosResponse<any>> {
    this.logger.log("Verifying Google Token", `${this.AppName}`);
    try {
      const response = await axios.get(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
      );
      return response.data;
    } catch (err) {
      this.logger.error("Error in verifying google token", `${this.AppName}`);
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
