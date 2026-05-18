export type PaymentMethod = "credit_card" | "crypto_wallet" | "vnpay";

export type PaymentPlan = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
};

export type PaymentSessionResult = {
  paymentId: string;
  status: "created" | "pending" | "completed";
  checkoutUrl?: string;
};

export type CreatePaymentSessionPayload = {
  planId: string;
  method: PaymentMethod;
};
