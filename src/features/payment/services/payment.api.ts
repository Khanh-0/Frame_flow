import { supabase } from "@/lib/supabase";
import type {
  CreatePaymentSessionPayload,
  PaymentPlan,
  PaymentSessionResult,
} from "../types/payment.types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const PLANS: PaymentPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$9",
    description: "Canvas access for one project, advance export options.",
    features: ["1 active project", "High quality export", "30 day history"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$19",
    description: "Best for teams and frequent designers.",
    features: ["5 active projects", "Priority support", "Shared libraries"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$39",
    description: "Full collaboration, advanced controls, team billing.",
    features: ["Unlimited projects", "Dedicated support", "Custom integrations"],
  },
];

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getPaymentPlans() {
  await delay();
  return PLANS;
}

export async function createPaymentSession(
  payload: CreatePaymentSessionPayload,
): Promise<PaymentSessionResult> {
  if (BASE_URL) {
    const response = await fetch(`${BASE_URL}/payment/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  await delay(600);

  const { data: user } = await supabase.auth.getUser();
  const userId = user?.user?.id ?? "anonymous";

  return {
    paymentId: `payment_${Date.now()}`,
    status: "created",
    checkoutUrl: undefined,
  };
}
