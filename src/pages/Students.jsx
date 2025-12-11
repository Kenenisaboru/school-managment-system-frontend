const columns = ["Name", "Grade", "Classroom", "Status"];

const sampleStudents = [
  { id: 1, name: "Amina Yusuf", grade: "10", classroom: "Science A", status: "Active" },
  { id: 2, name: "David Miller", grade: "9", classroom: "Math B", status: "Active" },
  { id: 3, name: "Noor Khan", grade: "11", classroom: "Humanities", status: "Pending" },
];

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-wide text-slate-500">Community</p>
        <h1 className="text-2xl font-semibold text-slate-900">Students</h1>
        <p className="text-sm text-slate-500">Track enrollment and classroom placement.</p>
      </header>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="search"
            placeholder="Search students..."
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none md:max-w-xs"
          />
          <button
            type="button"
            className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500"
          >
            Add Student
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sampleStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{student.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{student.grade}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{student.classroom}</td>
                  <td className="px-4 py-3 text-sm font-medium text-emerald-600">{student.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}


