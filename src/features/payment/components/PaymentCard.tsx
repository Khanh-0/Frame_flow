import type { PaymentPlan } from "../types/payment.types";

type PaymentCardProps = {
  plan: PaymentPlan;
  isSelected: boolean;
  onSelect: () => void;
};

export function PaymentCard({ plan, isSelected, onSelect }: PaymentCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-3xl border p-6 text-left transition-all duration-150 ${isSelected ? "border-blue-500 bg-blue-50 shadow-lg" : "border-slate-200 bg-white hover:border-slate-400"}`}
      style={{ minWidth: 260 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-500">{plan.name}</div>
          <div className="mt-2 text-3xl font-bold text-slate-950">{plan.price}</div>
        </div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          {isSelected ? "Selected" : "Choose"}
        </div>
      </div>

      <div className="mb-5 text-sm text-slate-600">{plan.description}</div>
      <ul className="space-y-2 text-sm text-slate-600">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
            {feature}
          </li>
        ))}
      </ul>
    </button>
  );
}
