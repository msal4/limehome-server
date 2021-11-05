export interface CreateReservationInput {
  firstName: string;
  lastName: string;
  checkInDate: string;
  checkOutDate: string;
  numOfGuests: number;
  billingAddress: string;
  billingCountry: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
}
