import express from "express";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import routes from "./routes"; 

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 1000 // limit each IP to 1000 requests per 30 mins
});

app.use(cors());
app.use(limiter)
app.use("/api", routes);

// app.get("/", (req: Request, res: Response) => {
//   res.send("HELLO WORLD");
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
