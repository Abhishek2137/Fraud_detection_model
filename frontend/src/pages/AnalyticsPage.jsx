import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';

const performance = [
  { label: 'Precision', value: '58%' },
  { label: 'Recall', value: '86%' },
  { label: 'F1 Score', value: '69%' },
];

const pieData = [
  { name: 'Fraud', value: 132 },
  { name: 'Non-Fraud', value: 668 },
];

const riskData = [
  { name: 'Low', value: 420 },
  { name: 'Medium', value: 210 },
  { name: 'High', value: 170 },
];

const featureData = [
  { feature: 'amount', importance: 35 },
  { feature: 'type', importance: 24 },
  { feature: 'balanceDiffDest', importance: 18 },
  { feature: 'balanceDiffOrig', importance: 14 },
  { feature: 'oldbalanceOrg', importance: 9 },
];

const COLORS = ['#22d3ee', '#fb7185'];

function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <SectionTitle label="Analytics" title="Model insights and fraud distribution" subtitle="Explore fraud class balance, risk weight, and feature impact from the trained XGBoost model." />

      <div className="grid gap-6 xl:grid-cols-3">
        {performance.map((item) => (
          <Card key={item.label} title={item.label} value={item.value}>
            <span>Model performance</span>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Fraud vs Non-Fraud</p>
              <h3 className="text-xl font-semibold text-white">Class balance distribution</h3>
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={70} outerRadius={110} dataKey="value" stroke="none">
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
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Risk breakdown</p>
            <h3 className="text-xl font-semibold text-white">Fraud risk distribution</h3>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} margin={{ top: 16, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 20 }} itemStyle={{ color: '#fff' }} />
                <Bar dataKey="value" fill="#22d3ee" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Feature importance</p>
            <h3 className="text-xl font-semibold text-white">XGBoost model drivers</h3>
          </div>
          <div className="space-y-4">
            {featureData.map((item) => (
              <div key={item.feature} className="space-y-2 rounded-3xl bg-slate-950/80 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-white">{item.feature}</p>
                  <span className="text-sm text-slate-400">{item.importance}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-cyan-400" style={{ width: `${item.importance}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Performance summary</p>
            <h3 className="text-xl font-semibold text-white">Validated model metrics</h3>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm text-slate-400">Dataset size</p>
              <p className="mt-3 text-3xl font-semibold text-white">6.3M+</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm text-slate-400">Model</p>
              <p className="mt-3 text-3xl font-semibold text-white">XGBoost</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm text-slate-400">Deployment</p>
              <p className="mt-3 text-3xl font-semibold text-white">API-first</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
