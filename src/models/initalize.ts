import { IUserAdminModel, IUserSchema } from "../types/admin"
import { IGeoLocationModel } from "../types/geoLocation"

export interface IInitDB {
  adminModel: IUserAdminModel
  geolocation: IGeoLocationModel
}
