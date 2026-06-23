import { Outlet, NavLink } from 'react-router-dom';
import { Home, ShieldCheck, BarChart3, FileText, Info } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/', icon: Home },
  { label: 'Live Prediction', path: '/prediction', icon: ShieldCheck },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Batch Analysis', path: '/batch', icon: FileText },
  { label: 'About Model', path: '/about', icon: Info },
];

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-white/10 bg-slate-950/95 p-6 backdrop-blur-xl">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-3 rounded-3xl bg-slate-900/80 px-4 py-3 shadow-soft ring-1 ring-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-600 text-slate-950">
                FG
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">FraudGuard AI</p>
                <h1 className="text-xl font-semibold">Fintech Fraud Ops</h1>
              </div>
            </div>
            <p className="max-w-[16rem] text-sm text-slate-400">A modern fraud detection platform for real-time transaction intelligence.</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-800 text-cyan-300 shadow-soft ring-1 ring-cyan-500/20'
                        : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-100'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <main className="px-6 py-6 lg:px-10 lg:py-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">FraudGuard AI</p>
              <h2 className="text-3xl font-semibold text-white">Commercial fraud intelligence for fintech teams</h2>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300 shadow-soft ring-1 ring-white/5">
              <span className="h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.35)]"></span>
              Connected to local API
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
