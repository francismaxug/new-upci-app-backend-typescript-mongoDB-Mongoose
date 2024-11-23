import { AdminServices } from "./admin"
import { IAppContext } from "../types/app"

export interface IServices {
  userAdmin: AdminServices
}

export const startServices = async (query: IAppContext) => {
  try {
    const userAdmin = new AdminServices(query)
    return { userAdmin }
  } catch (error) {
    throw error
  }
}
