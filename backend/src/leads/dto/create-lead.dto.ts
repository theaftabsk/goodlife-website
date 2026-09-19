export class CreateLeadDto {
  company: string;
  contactName?: string;
  contact?: string; // alias from frontend
  designation?: string;
  email: string;
  mobile: string;
  category?: string;
  revenueBand?: string;
  gmvBand?: string;
  gmv?: string; // alias from frontend
  orderVolume?: string;
  operatingModel?: string;
  opModel?: string;
  warehouseModel?: string;
  warehouses?: string;
  challenges?: string[];
  reconciled?: boolean | string;
  intent?: string;
  timeline?: string;
  source?: string;
  utmSource?: string;
  utmCampaign?: string;
  crmStatus?: string;
}
