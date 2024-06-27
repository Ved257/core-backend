import mongoose, { Document } from "mongoose";

export interface Company extends Document {
  readonly phone_number: string;
  readonly email: string;
  readonly full_name: string;
  readonly password: string;
  readonly company_name: string;
}
