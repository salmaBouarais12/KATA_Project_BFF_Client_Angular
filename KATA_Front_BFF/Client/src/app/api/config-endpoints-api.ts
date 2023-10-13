export const configEndpointsApi = {
    endpoints: {
      users: {
        read: "https://localhost:4200/api/persons",
        edit:"https://localhost:4200/api/persons/"
      },
      rooms:{
        read: "https://localhost:4200/api/rooms",
        edit: "https://localhost:4200/api/rooms/"
      },
      bookings:{
        read: "https://localhost:4200/api/bookings",
        edit: "https://localhost:4200/api/bookings/",
        readBookingForRoom : "https://localhost:4200/api/bookings/room/"
      },
      identityProvider:{
        read: "https://localhost:4200/bff/user",
        logout :"https://localhost:4200"
      }
    }
}
  