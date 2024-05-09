export interface VisitorPass {
  id: number;
  created_at: any;
  visitor_name: string;
  visitor_email: string | null;
  visitor_phone_number: string | null;
  visitor_plate_number: string;
  expires_at: any;
  pass_code: string;
  status: 'pending' | 'verified' | 'expired';
}