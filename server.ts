import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import routes from "./routes";

dotenv.config();

mongoose
  .connect(<string>process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connection successful!"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
const app = express();
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 1000 // limit each IP to 1000 requests per 30 mins
});

app.use(cors());
app.use(limiter);
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
