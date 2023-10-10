export const configEndpointsApi = {
    endpoints: {
      users: {
        read: "https://localhost:4200/api/persons",
        edit:"http://localhost:5262/api/persons/"
      },
      rooms:{
        read: "http://localhost:5262/api/rooms",
        edit: "http://localhost:5262/api/rooms/"
      },
      bookings:{
        read: "http://localhost:5262/api/bookings",
        edit: "http://localhost:5262/api/bookings/",
        readBookingForRoom : "http://localhost:5262/api/bookings/room/"
      },
      identityProvider:{
        read: "https://localhost:4200/bff/user",
        logout :"https://localhost:4200"
      }
    }
}
  