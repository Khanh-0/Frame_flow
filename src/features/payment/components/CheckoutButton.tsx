type CheckoutButtonProps = {
  loading: boolean;
  onClick: () => void;
};

export function CheckoutButton({ loading, onClick }: CheckoutButtonProps) {
  return (
    <button
      type="button"
      className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Processing..." : "Continue to checkout"}
    </button>
  );
}
