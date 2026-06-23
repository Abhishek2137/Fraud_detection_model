import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, BarChart, Bar, Legend } from 'recharts';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';

const kpis = [
  { title: 'Total Transactions', value: '6.3M+' },
  { title: 'Fraud Detection Rate', value: '17.8%' },
  { title: 'Precision', value: '58%' },
  { title: 'Recall', value: '86%' },
  { title: 'F1 Score', value: '69%' },
];

const areaData = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 18500 },
  { name: 'Mar', value: 14500 },
  { name: 'Apr', value: 20500 },
  { name: 'May', value: 17800 },
  { name: 'Jun', value: 22500 },
];

const pieData = [
  { name: 'Low', value: 65 },
  { name: 'Medium', value: 22 },
  { name: 'High', value: 13 },
];

const typeData = [
  { name: 'PAYMENT', value: 45 },
  { name: 'TRANSFER', value: 28 },
  { name: 'CASH_OUT', value: 20 },
  { name: 'DEBIT', value: 7 },
];

const recentDetections = [
  { id: 'A1D3', type: 'TRANSFER', amount: '$47,200', risk: 'High', status: 'Fraud' },
  { id: 'B7F9', type: 'CASH_OUT', amount: '$39,500', risk: 'Medium', status: 'Review' },
  { id: 'C4Z8', type: 'PAYMENT', amount: '$12,100', risk: 'Low', status: 'Legit' },
  { id: 'D9Q2', type: 'TRANSFER', amount: '$59,800', risk: 'High', status: 'Fraud' },
];

const RADIAN = Math.PI / 180;
const COLORS = ['#22d3ee', '#facc15', '#fb7185'];

function DashboardPage() {
  return (
    <div className="space-y-8">
      <SectionTitle
        label="Overview"
        title="Enterprise fraud telemetry"
        subtitle="Monitor fraud signal trends, model performance, and recent flagged transactions in one secure fintech console."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        {kpis.map((item) => (
          <Card key={item.title} title={item.title} value={item.value}>
            <span>Business-grade risk signal</span>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Fraud Trend</p>
              <h3 className="text-xl font-semibold text-white">Weekly transaction risk score</h3>
            </div>
            <span className="rounded-2xl bg-slate-800 px-3 py-2 text-xs text-slate-300">Realtime</span>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.55} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 20, borderColor: 'rgba(148,163,184,0.18)' }} labelStyle={{ color: '#fff' }} />
                <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={4} fill="url(#colorRisk)" activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-400">Risk level distribution</p>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={70} outerRadius={100} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 20 }} itemStyle={{ color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-400">Transaction type share</p>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeData} margin={{ top: 10, right: 0, left: -14, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.12)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 20 }} itemStyle={{ color: '#fff' }} />
                  <Legend wrapperStyle={{ color: '#94a3b8' }} />
                  <Bar dataKey="value" fill="#22d3ee" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Recent Detections</p>
            <h3 className="text-xl font-semibold text-white">Latest suspicious activity</h3>
          </div>
          <span className="rounded-2xl bg-slate-900/80 px-3 py-2 text-xs text-slate-300">Updated 2 min ago</span>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-white/10">
          <table className="w-full border-collapse text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Risk</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-950/70">
              {recentDetections.map((row) => (
                <tr key={row.id} className="hover:bg-slate-900/70 transition-colors duration-200">
                  <td className="px-6 py-4 font-medium text-white">{row.id}</td>
                  <td className="px-6 py-4">{row.type}</td>
                  <td className="px-6 py-4">{row.amount}</td>
                  <td className="px-6 py-4 text-slate-100">{row.risk}</td>
                  <td className={`px-6 py-4 font-semibold ${row.status === 'Fraud' ? 'text-rose-400' : row.status === 'Review' ? 'text-amber-300' : 'text-emerald-400'}`}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
