export default function AnnouncementCard({ title, body, author, audience, pinned, createdAt }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-slate-900">{title}</p>
          <p className="text-sm text-slate-500">{audience === "all" ? "All users" : audience}</p>
        </div>
        {pinned ? (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase text-amber-700">
            Pinned
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
      <div className="mt-4 flex justify-between text-xs text-slate-400">
        <p>{author ?? "System"}</p>
        <p>{createdAt ? new Date(createdAt).toLocaleString() : "—"}</p>
      </div>
    </article>
  );
}


