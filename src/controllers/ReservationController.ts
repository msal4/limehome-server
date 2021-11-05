import { Request, Response } from "express";
import { ValidationError } from "joi";
import { ReservationService } from "../services/reservation";

export class ReservationController {
  constructor(private service: ReservationService) {}

  list = async (req: Request, res: Response) => {
    try {
      const reservations = await this.service.list(req.query);
      res.json(reservations);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(400).json(err);
        return;
      }
      // TODO: use a logger instead.
      console.log(err);
      res.send(500).json({ error: "Something went wrong" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const reservation = await this.service.create(req.body);
      res.json(reservation);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(400).json(err);
        return;
      }
      // TODO: use a logger.
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  };
}
