import mongoose, { Schema } from "mongoose";

export const QuoteSchema: Schema = new mongoose.Schema({
  quote: String
})
