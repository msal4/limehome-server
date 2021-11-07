# limehome server

## Run

- Install dependencies

```bash
yarn
```

- Set environment variables

```bash
cp .env.example .env
```

set the required `DATABASE_URL`

and run the server

```bash
yarn start
```

## Public

The server is hosted in my private dokku (basically an open source heroku) server.  
It's available at [https://limehome.hassah.me](https://limehome.hassah.me)

And the frontend is hosted on netlify at [https://amazing-snyder-7b63d7.netlify.app](https://amazing-snyder-7b63d7.netlify.app)

## Endpoints

- GET /api/reservations  
  query params: {take?: integer >= 0, skip?: integer >=0}

- POST /api/reservations  
  body (content-type: application/json):
  - firstName: string **(required)**
  - lastName: string **(required)**
  - checkInDate: string **(required)**
  - checkOutDate: string **(required)**
  - numOfGuests: number **(required)**
  - billingAddress: string **(required)**
  - billingCountry: string **(required)**
  - postalCode: string **(required)**
  - city: string **(required)**
  - phone: string **(required)**
  - email: string **(required)**
