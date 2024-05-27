import { Document, Model, Types } from "mongoose"
export interface IUserAdmin {
  isMainAdmin: boolean
  isSuperAdmin: boolean
  firstName: string
  phoneNumber: string
  lastName: string
  profileImage: string
  email: string
  isSubmitFullDetails: boolean
}

export interface IUserSchema extends IUserAdmin, Document {
  _id: Types.ObjectId
  comparePasswords(password: string): Promise<boolean>
  adminID: string
  isAdmin: boolean
  country: string
  password: string
  region: string
  placeOfResidence: string
  createdAt: Date
  updatedAt: Date
}

export interface IUserGetAuthInfo extends IUserAdmin {
  _id: string
}
export interface IUserGetAllInfo {
  isAdmin: boolean
  isMainAdmin: boolean
  firstName: string
  lastName: string
  email: string
  country: string
  region: string
  placeOfResidence: string
  phoneNumber: string
  isSubmitFullDetails: boolean
  profileImage: string
}

export interface IUserAdminModel extends Model<IUserSchema> {}
