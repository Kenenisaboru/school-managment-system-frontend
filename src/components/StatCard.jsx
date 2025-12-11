export default function StatCard({ label, value, delta }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{value ?? 0}</p>
      {typeof delta === "number" ? (
        <p className="mt-2 text-xs font-medium text-emerald-600">{delta >= 0 ? "+" : ""}
          {delta}% vs last week</p>
      ) : null}
    </div>
  );
}


