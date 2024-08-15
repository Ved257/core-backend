import mongoose, { Document } from "mongoose";

export interface User extends Document {
  readonly phone_number: string;
  readonly email: string;
  readonly full_name: string;
  readonly current_company: string;
  readonly cv: string;
  readonly is_community_owner: boolean;
  readonly password: string;
  readonly city: string;
  readonly current_role: string;
  readonly years_of_experience: number;
  readonly student_or_new_graduate: boolean;
  readonly currently_employed: boolean;
  readonly linkedin_profile: string;
  readonly term_and_conditions: boolean;
  readonly privacy_mode: string;
  readonly user_name: string;
  readonly profile_pic: string;
}

export interface loginUser extends User {
  readonly access_token: string;
}
