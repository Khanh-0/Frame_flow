import type { PaymentMethod } from "../types/payment.types";

type CryptoWalletButtonProps = {
  method: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
};

const labelByMethod: Record<PaymentMethod, string> = {
  credit_card: "Credit Card",
  crypto_wallet: "Crypto Wallet",
  vnpay: "VNPay",
};

export function CryptoWalletButton({ method, selected, onSelect }: CryptoWalletButtonProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-2xl border px-4 py-3 text-sm text-left transition-all duration-150 ${selected ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-400"}`}
    >
      <div className="font-semibold text-slate-900">{labelByMethod[method]}</div>
      <div className="mt-1 text-xs text-slate-500">
        {method === "credit_card" && "Visa, Mastercard, Amex"}
        {method === "crypto_wallet" && "MetaMask / WalletConnect"}
        {method === "vnpay" && "Vietnamese local payment"}
      </div>
    </button>
  );
}
