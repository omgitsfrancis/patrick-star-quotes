import mongoose from "mongoose";
import { QuoteSchema } from "./quotes";

export const Quote = mongoose.model('quote', QuoteSchema, 'quote');