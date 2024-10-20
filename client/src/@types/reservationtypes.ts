import { Guest } from "./guestTypes";
import { Room } from "./roomTypes";

export interface Reservation {
  id: number;
  guest: Guest;
  room: Room;
  checkInDate: Date;
  checkOutDate: Date;
}