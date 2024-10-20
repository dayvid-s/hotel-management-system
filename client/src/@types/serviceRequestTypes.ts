import { Guest } from "./guestTypes";

export interface ServiceRequest {
  id: number;
  description: string;
  status: string;
  guest: Guest;
  guestId?: number;
}