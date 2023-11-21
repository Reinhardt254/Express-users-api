import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotenv from "dotenv";
import http from "http";
import router from "./routes"

const app = express();

app.use(cors({
   credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

dotenv.config();

const server = http.createServer(app);
const port = process.env.PORT;

server.listen(port, () => {
   `server running on port ${port}`
});

app.use("/", router())
