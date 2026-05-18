import { Link } from "react-router";
import { XCircle } from "lucide-react";

export function CancelPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-700">
          <XCircle size={36} />
        </div>
        <h1 className="text-3xl font-bold">Thanh toán không hoàn thành</h1>
        <p className="mt-4 text-sm text-slate-600">
          Giao dịch bị hủy hoặc không thành công. Bạn có thể thử lại lần nữa.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/payment"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Thử lại thanh toán
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
          >
            Quay về Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
