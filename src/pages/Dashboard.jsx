import StatCard from "../components/StatCard.jsx";
import { useDashboardOverview } from "../hooks/useDashboardOverview.js";

const fallbackSummary = {
  studentCount: 0,
  teacherCount: 0,
  classroomCount: 0,
  attendanceToday: 0,
};

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboardOverview();
  const summary = data?.summary ?? fallbackSummary;
  const assignments = data?.upcomingAssignments ?? [];
  const byGrade = data?.studentsByGrade ?? [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">Overview</p>
          <h1 className="text-2xl font-semibold text-slate-900">Good afternoon 👋</h1>
          <p className="text-sm text-slate-500">Here&apos;s a quick snapshot of your school.</p>
        </div>
        {isError ? (
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
            Live data unavailable
          </span>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Students" value={summary.studentCount} delta={4} />
        <StatCard label="Teachers" value={summary.teacherCount} delta={1} />
        <StatCard label="Classrooms" value={summary.classroomCount} delta={0} />
        <StatCard label="Attendance Today" value={summary.attendanceToday} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Upcoming assignments</h2>
            {isLoading ? <p className="text-xs uppercase text-slate-400">Syncing…</p> : null}
          </div>
          <div className="mt-4 space-y-4">
            {assignments.length === 0 ? (
              <p className="text-sm text-slate-500">No assignments due soon.</p>
            ) : (
              assignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{assignment.title}</p>
                    <p className="text-xs text-slate-500">{assignment.subject}</p>
                  </div>
                  <p className="text-xs font-medium text-slate-500">
                    Due {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Students by grade</h2>
          <div className="mt-6 space-y-3">
            {byGrade.length === 0 ? (
              <p className="text-sm text-slate-500">We’ll show trends once data is ready.</p>
            ) : (
              byGrade.map((grade) => (
                <div key={grade.grade} className="rounded-xl border border-slate-100 px-4 py-3">
                  <p className="text-sm font-medium text-slate-600">Grade {grade.grade}</p>
                  <p className="text-2xl font-semibold text-slate-900">{grade.dataValues?.count ?? grade.count}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}


