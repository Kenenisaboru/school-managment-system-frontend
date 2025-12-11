import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Announcements", to: "/announcements" },
  { label: "Students", to: "/students" },
];

export default function Layout({ children }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-lg font-semibold text-brand-600">School Manager</p>
            <p className="text-sm text-slate-500">Empower learning every day</p>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="text-right">
                  <p className="text-sm font-medium">{`${user.firstName ?? "Admin"} ${user.lastName ?? ""}`.trim()}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{user.role ?? "admin"}</p>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-md border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-8">
        <aside className="w-56 rounded-xl bg-white p-4 shadow-sm">
          <p className="mb-4 text-xs font-semibold uppercase text-slate-400">Navigation</p>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive ? "bg-brand-50 text-brand-600" : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}


