import { Link } from "react-router";
import { CheckCircle2 } from "lucide-react";

export function SuccessPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 size={36} />
        </div>
        <h1 className="text-3xl font-bold">Payment successful</h1>
        <p className="mt-4 text-sm text-slate-600">
          Cảm ơn bạn! Giao dịch đã được ghi nhận và quyền truy cập đã được mở khóa.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Quay về Projects
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
          >
            Trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}
