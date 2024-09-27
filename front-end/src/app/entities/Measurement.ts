export interface Measurement {
  id?: string;
  value: number;
  timestamp: string | Date;
  equipmentId: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}