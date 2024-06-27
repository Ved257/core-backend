import * as mongoose from "mongoose";
import { Company } from "src/interface/company.interface";

export const companySchema = new mongoose.Schema<Company>(
  {
    phone_number: String,
    email: String,
    full_name: String,
    password: String,
    company_name: String,
  },
  { timestamps: true }
);

companySchema.index({ email: 1 }, { unique: true });

export const CompanyModel: mongoose.Model<Company> = mongoose.model<Company>(
  "company",
  companySchema,
  "company"
);
