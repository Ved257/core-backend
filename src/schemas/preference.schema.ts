import * as mongoose from "mongoose";
import { jobType, whereInJobSearch } from "src/enums/user.enum";
import { Preference } from "src/interface/preference.interface";

const CompanySizePreferenceSchema = new mongoose.Schema(
  {
    ideal: Boolean,
    yes: Boolean,
    no: Boolean,
  },
  { _id: false }
);

export const preferenceSchema = new mongoose.Schema<Preference>(
  {
    user_id: { type: String, required: true },
    where_in_job_search: {
      type: String,
      enum: whereInJobSearch,
      required: true,
    },
    sponsorship_requirement_to_work_in_us: { type: Boolean, required: true },
    legally_to_work_in_us: { type: Boolean, required: true },
    job_type: { type: String, enum: jobType, required: true },
    preferred_locations: [String],
    open_to_work_remotely: Boolean,
    desired_salary_currency: { type: String, required: true },
    desired_salary_amount: { type: Number, required: true },
    company_size_preferences: {
      seed: CompanySizePreferenceSchema,
      early: CompanySizePreferenceSchema,
      mid_size: CompanySizePreferenceSchema,
      large: CompanySizePreferenceSchema,
      very_large: CompanySizePreferenceSchema,
      massive: CompanySizePreferenceSchema,
    },
  },
  { timestamps: true }
);

preferenceSchema.index({ user_id: 1 }, { unique: true });

export const PreferenceModel: mongoose.Model<Preference> =
  mongoose.model<Preference>("preference", preferenceSchema, "preference");
