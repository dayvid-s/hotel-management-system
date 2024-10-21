import { Reservation } from "./reservationtypes";
import { ServiceRequest } from "./serviceRequestTypes";

export interface Guest {
  id: number;
  name: string;
  cpf: string;
  password: string;
  roomId?: number;
  requests?: string;
  reservations?: Reservation[];
  serviceRequests?: ServiceRequest[];
}