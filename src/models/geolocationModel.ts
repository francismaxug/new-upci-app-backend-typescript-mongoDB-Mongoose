import { Schema, model, Model } from "mongoose"

const geolocationSchema = new Schema({
  ipAddress: {
    type: String
  },
  countryFlag: {
    type: String
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
