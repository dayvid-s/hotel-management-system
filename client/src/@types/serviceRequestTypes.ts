
export interface ServiceRequestInBackend {
  id: number;
  guestId: number;
  description: string;
  status?: string;
}

export interface ServiceRequest {
  id: number;
  guestId: number;
  guestCpf: string;
  description: string;
  status?: string;
}