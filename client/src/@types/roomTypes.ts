import { Reservation } from "./reservationtypes";

export interface Room {
  id?: number;
  number: string;
  type: 'Simples' | 'Duplo' | 'Suite';
  status: 'Disponível' | 'Ocupado' | 'Em Manutenção';
  price: number;
  isReserved?: boolean;
  reservations?: Reservation[] | null;
  checkIn?: Date;
  checkOut?: Date;
}