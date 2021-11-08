import { prismaMock } from "../../../singleton";
import { ReservationService } from "./ReservationService";
import { CreateReservationInput } from "./CreateReservationInput";

const service = new ReservationService(prismaMock);

const testInput: CreateReservationInput = {
  firstName: "John",
  lastName: "Doe",
  numOfGuests: 2,
  billingAddress: "123",
  billingCountry: "de",
  checkInDate: "2020/02/20",
  checkOutDate: "2020/02/21",
  city: "Berlin",
  email: "test@test.com",
  phone: "+1023984572398",
  postalCode: "12300",
};

describe("ReservationService/create", () => {
  it("should create new reservation", async () => {
    const reservation = {
      ...testInput,
      id: 1,
      checkInDate: new Date(),
      checkOutDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    prismaMock.reservation.create.mockResolvedValue(reservation);

    await expect(service.create(testInput)).resolves.toEqual(reservation);
  });

  it("should fail if user provides invalid phone number", async () => {
    const input = { ...testInput, phone: "34334534" };

    await expect(service.create(input)).rejects.toMatchObject({
      details: [{ path: ["phone"] }],
    });
  });

  it("should fail if user provides invalid numOfGuests", async () => {
    const input = { ...testInput, numOfGuests: -1 };
    await expect(service.create(input)).rejects.toMatchObject({
      details: [{ path: ["numOfGuests"] }],
    });
  });

  it("should fail if user provides invalid input", async () => {
    let input = { ...testInput, billingCountry: "" };
    await expect(service.create(input)).rejects.toMatchObject({
      details: [{ path: ["billingCountry"] }],
    });
    input = { ...testInput, firstName: "" };
    await expect(service.create(input)).rejects.toMatchObject({
      details: [{ path: ["firstName"] }],
    });
    input = { ...testInput, lastName: "" };
    await expect(service.create(input)).rejects.toMatchObject({
      details: [{ path: ["lastName"] }],
    });
    input = { ...testInput, email: "" };
    await expect(service.create(input)).rejects.toMatchObject({
      details: [{ path: ["email"] }],
    });
    input = { ...testInput, postalCode: "" };
    await expect(service.create(input)).rejects.toMatchObject({
      details: [{ path: ["postalCode"] }],
    });
    input = { ...testInput, checkOutDate: "" };
    await expect(service.create(input)).rejects.toMatchObject({
      details: [{ path: ["checkOutDate"] }],
    });
    input = { ...testInput, checkInDate: "" };
    await expect(service.create(input)).rejects.toMatchObject({
      details: [{ path: ["checkInDate"] }],
    });
    input = { ...testInput, billingCountry: "" };
    await expect(service.create(input)).rejects.toMatchObject({
      details: [{ path: ["billingCountry"] }],
    });
    input = { ...testInput, billingAddress: "" };
    await expect(service.create(input)).rejects.toMatchObject({
      details: [{ path: ["billingAddress"] }],
    });
    input = { ...testInput, city: "" };
    await expect(service.create(input)).rejects.toMatchObject({
      details: [{ path: ["city"] }],
    });
  });
});

describe("ReservationService/list", () => {
  it("should return a list of reservations", async () => {
    prismaMock.reservation.findMany.mockResolvedValue([]);
    await expect(service.list()).resolves.toMatchObject({ items: [] });

    const reservation = {
      ...testInput,
      id: 1,
      checkInDate: new Date(),
      checkOutDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.reservation.findMany.mockResolvedValue([reservation]);
    await expect(service.list()).resolves.toMatchObject({ items: [reservation] });

    await expect(service.list({ take: 10, skip: 0 })).resolves.toMatchObject({ items: [reservation] });
  });

  it("should fail if user provides invalid pagination input", async () => {
    service.list({ skip: -1 }).catch((r) => console.log(JSON.stringify(r, null, 2)));
    await expect(service.list({ skip: -1 })).rejects.toMatchObject({
      details: [{ path: ["skip"] }],
    });

    await expect(service.list({ take: -1 })).rejects.toMatchObject({
      details: [{ path: ["take"] }],
    });
  });
});
