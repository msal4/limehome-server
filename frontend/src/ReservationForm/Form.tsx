import { Header } from "./Header";
import { Button } from "./Button";
import { Input } from "./Input";
import { RangeDatePickerInput } from "./RangeDatePickerInput";
import { SelectorInput } from "./SelectorInput";
import { Formik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";

export const ReservationForm = () => {
  const today = dayjs().format(dateFormat);
  return (
    <Formik
      initialValues={{
        checkInDate: today,
        checkOutDate: today,
        numOfGuests: 1,
        firstName: "",
        lastName: "",
        billingAddress: "",
        billingCountry: "",
        postalCode: "",
        city: "",
        email: "",
        phone: "",
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        fetch("http://localhost:4000/reservations", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "content-type": "application/json",
          },
        })
          .then(res => res.json())
          .then(json => {
            alert(JSON.stringify(json, null, 2));
            setSubmitting(false);
          })
          .catch(console.log);
      }}
    >
      {({
        handleSubmit,
        isSubmitting,
        handleBlur,
        handleChange,
        values,
        errors,
        touched,
      }) => {
        return (
          <form className="max-w-7xl mx-auto" onSubmit={handleSubmit}>
            <Header>Book your suite at limehome</Header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <RangeDatePickerInput
                label="Check-in/out dates"
                value={[
                  dayjs(values.checkInDate).toDate(),
                  dayjs(values.checkOutDate).toDate(),
                ]}
                onChange={(startDate, endDate) => {
                  handleChange("checkInDate")(
                    dayjs(startDate).format(dateFormat)
                  );
                  handleChange("checkOutDate")(
                    dayjs(endDate).format(dateFormat)
                  );
                }}
                disabled={isSubmitting}
              />
              <Input
                label="Number of guests"
                value={values.numOfGuests.toString()}
                placeholder="Number of guests"
                onBlur={handleBlur("numOfGuests")}
                onChange={v => {
                  const n = parseInt(v);
                  handleChange("numOfGuests")((isNaN(n) ? 1 : n).toString());
                }}
                disabled={isSubmitting}
                error={
                  errors.numOfGuests &&
                  touched.numOfGuests &&
                  errors.numOfGuests
                }
              />
              <Input
                label="First Name"
                value={values.firstName}
                placeholder="First Name"
                onBlur={handleBlur("firstName")}
                onChange={handleChange("firstName")}
                disabled={isSubmitting}
                error={
                  errors.firstName && touched.firstName && errors.firstName
                }
              />
              <Input
                label="Last Name"
                value={values.lastName}
                placeholder="Last Name"
                onBlur={handleBlur("lastName")}
                onChange={handleChange("lastName")}
                disabled={isSubmitting}
                error={errors.lastName && touched.lastName && errors.lastName}
              />
              <Input
                label="Billing Address"
                value={values.billingAddress}
                placeholder="Billing Address"
                onBlur={handleBlur("billingAddress")}
                onChange={handleChange("billingAddress")}
                disabled={isSubmitting}
                error={
                  errors.billingAddress &&
                  touched.billingAddress &&
                  errors.billingAddress
                }
              />
              <SelectorInput
                label="Billing Country"
                placeholder="Select Country..."
                value={values.billingCountry}
                items={countries}
                onChange={handleChange("billingCountry")}
                disabled={isSubmitting}
                error={
                  errors.billingCountry &&
                  touched.billingCountry &&
                  errors.billingCountry
                }
              />
              <Input
                label="Postal Code"
                value={values.postalCode}
                placeholder="Postal Code"
                onBlur={handleBlur("postalCode")}
                onChange={handleChange("postalCode")}
                disabled={isSubmitting}
                error={
                  errors.postalCode && touched.postalCode && errors.postalCode
                }
              />
              <Input
                label="City"
                value={values.city}
                placeholder="City"
                onBlur={handleBlur("city")}
                onChange={handleChange("city")}
                disabled={isSubmitting}
                error={errors.city && touched.city && errors.city}
              />
              <Input
                name="email"
                label="Email"
                value={values.email}
                placeholder="your@email.com"
                onBlur={handleBlur("email")}
                onChange={handleChange("email")}
                disabled={isSubmitting}
                error={errors.email && touched.email && errors.email}
              />
              <Input
                name="phone"
                label="Phone number"
                value={values.phone}
                placeholder="Your phone number"
                onBlur={handleBlur("phone")}
                onChange={handleChange("phone")}
                disabled={isSubmitting}
                error={errors.phone && touched.phone && errors.phone}
              />
            </div>
            <Button disabled={isSubmitting} type="submit">
              BOOK NOW
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

const schema = yup.object().shape({
  checkInDate: yup.date().required().label("Check-in date"),
  checkOutDate: yup.date().required().label("Check-in date"),
  numOfGuests: yup.number().integer().min(1).label("Number of guests"),
  firstName: yup.string().max(100).required().label("First Name"),
  lastName: yup.string().max(100).required().label("Last Name"),
  billingAddress: yup.string().required().label("Billing Address"),
  billingCountry: yup.string().required().label("Billing Country"),
  postalCode: yup.string().required().label("Postal Code"),
  city: yup.string().required().label("City"),
  email: yup.string().email().required().label("Email"),
  phone: yup
    .string()
    .required()
    .test({
      test: v => /^\+(?:[0-9] ?){6,14}[0-9]$/.test(v ?? ""),
      message:
        "Phone number must be a valid phone number that includes the country code",
    })
    .label("Phone"),
});

// Ideally we would get this data from a datasource (like our api) but I'm doing
// it like this since it's a prototype and its out of scope for this challenge.
const countries = [
  { value: "de", label: "Germany" },
  { value: "aut", label: "Austria" },
  { value: "nld", label: "Netherlands" },
  { value: "esp", label: "Spain" },
];
