export interface HealthcareFacility {
  id: number;
  name: string;
  type: string;
  address: string;
  district: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  isActive: boolean;
}
