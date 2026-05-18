import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { PaymentMethod, PaymentPlan } from "../types/payment.types";
import {
  createPaymentSession,
  getPaymentPlans,
} from "../services/payment.api";
import { ROUTES } from "@/app/routes";

const DEFAULT_METHOD: PaymentMethod = "credit_card";

export function usePayment() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PaymentPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("starter");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(DEFAULT_METHOD);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPlans() {
      try {
        const data = await getPaymentPlans();
        if (!cancelled) {
          setPlans(data);
          setSelectedPlanId(data[0]?.id ?? "starter");
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    setIsLoading(true);
    loadPlans();
    return () => { cancelled = true; };
  }, []);

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) ?? plans[0];

  const handleSelectPlan = useCallback((planId: string) => {
    setSelectedPlanId(planId);
  }, []);

  const handleCheckout = useCallback(async () => {
    if (!selectedPlanId) {
      setError("Please select a plan before checkout.");
      return;
    }

    setCheckoutLoading(true);
    setError(null);

    try {
      const session = await createPaymentSession({
        planId: selectedPlanId,
        method: paymentMethod,
      });

      if (session.checkoutUrl) {
        window.location.href = session.checkoutUrl;
        return;
      }

      navigate(ROUTES.paymentSuccess);
    } catch (err) {
      setError((err as Error).message);
      navigate(ROUTES.paymentCancel);
    } finally {
      setCheckoutLoading(false);
    }
  }, [navigate, paymentMethod, selectedPlanId]);

  const handleSelectMethod = useCallback((method: PaymentMethod) => {
    setPaymentMethod(method);
  }, []);

  return {
    plans,
    selectedPlan,
    selectedPlanId,
    paymentMethod,
    isLoading,
    checkoutLoading,
    error,
    handleSelectPlan,
    handleSelectMethod,
    handleCheckout,
  };
}
