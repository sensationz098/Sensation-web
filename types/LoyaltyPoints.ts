export interface LoyaltyPointsObject {
  points: LoyaltyPoints[];
  total: number;
}

export interface LoyaltyPoints {
  createdAt: string;
  id: string;
  points: number;
  receipt_id: string;
  status: string;
}
