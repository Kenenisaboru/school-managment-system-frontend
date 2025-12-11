import AnnouncementCard from "../components/AnnouncementCard.jsx";
import { useAnnouncements } from "../hooks/useAnnouncements.js";

const demoAnnouncements = [
  {
    id: 1,
    title: "Welcome back, teachers!",
    body: "We are excited to kick off the new term. Please review the academic calendar and update your classrooms.",
    audience: "teachers",
    pinned: true,
    author: "Principal Office",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "PTA Meeting",
    body: "Parents are invited to the quarterly PTA meeting next Wednesday at 4:00 PM.",
    audience: "all",
    pinned: false,
    author: "Community Relations",
    createdAt: new Date().toISOString(),
  },
];

export default function AnnouncementsPage() {
  const { data, isLoading, isError } = useAnnouncements();
  const announcements = data?.length ? data : demoAnnouncements;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Communication</p>
          <h1 className="text-2xl font-semibold text-slate-900">Announcements</h1>
          <p className="text-sm text-slate-500">Share news with students and staff.</p>
        </div>
        {isLoading ? <span className="text-xs text-slate-400">Syncing…</span> : null}
      </div>

      {isError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Live announcements are unavailable. Showing sample data for now.
        </div>
      ) : null}

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            title={announcement.title}
            body={announcement.body}
            author={
              announcement.author?.firstName
                ? `${announcement.author.firstName} ${announcement.author.lastName ?? ""}`.trim()
                : announcement.author
            }
            audience={announcement.audience}
            pinned={announcement.pinned}
            createdAt={announcement.createdAt}
          />
        ))}
      </div>
    </div>
  );
}


