import { PrismaClient } from "@prisma/client";
import Express from "express";
import { json as jsonBodyParser } from "body-parser";
import cors from "cors";
import { ReservationService } from "./src/services/reservation";
import { ReservationController } from "./src/controllers";
import { serverPort } from "./src/config";

function bootstrap() {
  const app = Express();

  // middleware
  app.use(cors());
  app.use(jsonBodyParser());
  app.use(Express.static("frontend/build"));

  const prisma = new PrismaClient();
  const service = new ReservationService(prisma);
  const controller = new ReservationController(service);

  // api
  const api = Express.Router();
  api.get("/reservations", controller.list);
  api.post("/reservations", controller.create);
  app.use("/api", api);

  app.listen(serverPort, () => console.log(`Listening at :${serverPort}`));
}

bootstrap();
