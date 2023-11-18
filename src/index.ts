import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotenv from "dotenv";
import http from "http";

const app = express();

app.use(cors({
   credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

dotenv.config();

const server = http.createServer(app);

server.listen(8000, () => {
   "server running on port 8000"
});
