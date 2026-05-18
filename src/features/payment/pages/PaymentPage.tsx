import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { usePayment } from "../hooks/usePayment";
import { PaymentCard } from "../components/PaymentCard";
import { CheckoutButton } from "../components/CheckoutButton";
import { CryptoWalletButton } from "../components/CryptoWalletButton";

export function PaymentPage() {
  const {
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
  } = usePayment();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="text-lg font-semibold">Loading payment plans...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Payment</div>
          <h1 className="mt-3 text-4xl font-bold">Choose your plan</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-600">
            Select the correct subscription for your workflow and complete checkout quickly.
          </p>
        </div>
        <Link to="/projects" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-300">
          <ArrowRight size={16} /> Back to Projects
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <PaymentCard
            key={plan.id}
            plan={plan}
            isSelected={plan.id === selectedPlanId}
            onSelect={() => handleSelectPlan(plan.id)}
          />
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-500">Payment method</div>
            <div className="mt-2 text-lg font-bold text-slate-950">{selectedPlan?.name ?? "Starter"}</div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <CryptoWalletButton method="credit_card" selected={paymentMethod === "credit_card"} onSelect={() => handleSelectMethod("credit_card")} />
            <CryptoWalletButton method="crypto_wallet" selected={paymentMethod === "crypto_wallet"} onSelect={() => handleSelectMethod("crypto_wallet")} />
            <CryptoWalletButton method="vnpay" selected={paymentMethod === "vnpay"} onSelect={() => handleSelectMethod("vnpay")} />
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-[1fr_240px] md:items-end">
          <div>
            <div className="text-sm font-semibold text-slate-500">Order summary</div>
            <div className="mt-2 rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between text-base font-semibold text-slate-950">
                <span>{selectedPlan?.name ?? "Starter"}</span>
                <span>{selectedPlan?.price ?? "$9"}</span>
              </div>
              <div className="mt-3 text-sm text-slate-600">{selectedPlan?.description}</div>
            </div>
          </div>
          <CheckoutButton loading={checkoutLoading} onClick={handleCheckout} />
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 rounded-3xl bg-slate-900 p-6 text-white">
          <div className="text-sm uppercase tracking-[0.24em] text-blue-300">Why subscribe?</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-semibold">Protect your work</div>
              <p className="mt-2 text-sm text-slate-300">Secure backup, faster exports and team collaboration.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-semibold">Better support</div>
              <p className="mt-2 text-sm text-slate-300">Priority help when you need it, from onboarding to production.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
