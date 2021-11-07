import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import {
  paginationTakeDefault,
  paginationTakeMax,
  phoneRegexp,
} from "../../config";
import { CreateReservationInput } from "./CreateReservationInput";
import { ListReservationsInput } from "./ListReservationInput";

export class ReservationService {
  constructor(private prisma: PrismaClient) {}

  async create(input: CreateReservationInput) {
    const validationRes = this.createReservationSchema.validate(input);
    if (validationRes.error) {
      throw validationRes.error;
    }

    return await this.prisma.reservation.create({
      data: validationRes.value,
    });
  }

  async list(input?: ListReservationsInput) {
    const validationRes = this.listReservationsInputSchema.validate(input);
    if (validationRes.error) {
      throw validationRes.error;
    }

    return await this.prisma.reservation.findMany({
      skip: Number(validationRes.value?.skip),
      take: Number(validationRes.value?.take),
    });
  }

  private createReservationSchema = Joi.object<CreateReservationInput>({
    firstName: Joi.string().min(1).max(100).required(),
    lastName: Joi.string().min(1).max(100).required(),
    checkInDate: Joi.date().required(),
    checkOutDate: Joi.date().required(),
    numOfGuests: Joi.number().integer().positive().required(),
    billingAddress: Joi.string().required(),
    billingCountry: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.string().required(),
    phone: Joi.string()
      .required()
      .custom((v, helper) => {
        if (!phoneRegexp.test(v)) {
          return helper.error("any.invalid");
        }
        return v;
      }),
    email: Joi.string().email().required(),
  });

  private listReservationsInputSchema = Joi.object<ListReservationsInput>({
    take: Joi.number()
      .integer()
      .positive()
      .default(paginationTakeDefault)
      .max(paginationTakeMax),
    skip: Joi.number().integer().positive().default(0),
  });
}
