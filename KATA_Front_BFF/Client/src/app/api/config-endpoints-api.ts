import { environment } from "src/environments/environment";

export const configEndpointsApi = {
    endpoints: {
      users: {
        read: `${environment.bffUrl}/api/persons`,
        edit:`${environment.bffUrl}/api/persons/`
      },
      rooms:{
        read: `${environment.bffUrl}/api/rooms`,
        edit: `${environment.bffUrl}/api/rooms/`
      },
      bookings:{
        read: `${environment.bffUrl}/api/bookings`,
        edit:`${environment.bffUrl}/api/bookings/`,
        readBookingForRoom : `${environment.bffUrl}/api/bookings/room/`
      },
      identityProvider:{
        read: `${environment.bffUrl}/bff/user`,
        logout :`${environment.bffUrl}`
      }
    }
}