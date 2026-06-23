import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import { predictTransaction } from '../services/api';

const options = [
  { label: 'PAYMENT', value: 0 },
  { label: 'TRANSFER', value: 1 },
  { label: 'CASH_OUT', value: 2 },
  { label: 'DEPOSITE', value: 3 },
];

const riskStyles = {
  safe: 'border-2 border-emerald-400/20 bg-emerald-500/10 text-emerald-300',
  medium: 'border-2 border-amber-400/20 bg-amber-500/10 text-amber-300',
  high: 'border-2 border-rose-400/20 bg-rose-500/10 text-rose-300',
};

function LivePredictionPage() {
  const [form, setForm] = useState({ type: 0, amount: 50000, oldbalanceOrg: 100000, newbalanceOrig: 50000, oldbalanceDest: 0, newbalanceDest: 50000 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const payload = useMemo(() => {
    const balanceDiffOrig = form.oldbalanceOrg - form.newbalanceOrig;
    const balanceDiffDest = form.newbalanceDest - form.oldbalanceDest;

    return {
      ...form,
      balanceDiffOrig,
      balanceDiffDest,
    };
  }, [form]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await predictTransaction(payload);
      setResult(response);
    } catch (err) {
      setError('Unable to reach the fraud API.');
    } finally {
      setLoading(false);
    }
  };

  const riskLevel = useMemo(() => {
    if (!result) return null;
    if (result.fraud_probability >= 0.8) return 'high';
    if (result.fraud_probability >= 0.45) return 'medium';
    return 'safe';
  }, [result]);

  const statusLabel = useMemo(() => {
    if (!result) return 'Awaiting prediction';
    return result.prediction === 1 ? 'High Risk Fraud' : 'Legitimate';
  }, [result]);

  return (
    <div className="space-y-8">
      <SectionTitle
        label="Live prediction"
        title="Real-time transaction scoring"
        subtitle="Submit a transaction for fraud inference and see risk, probability, and clear verdicts in seconds."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-300">
                Transaction Type
                <select value={form.type} onChange={(e) => setForm({ ...form, type: Number(e.target.value) })} className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/60">
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                Amount
                <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/60" />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-300">
                Old Balance Origin
                <input type="number" value={form.oldbalanceOrg} onChange={(e) => setForm({ ...form, oldbalanceOrg: Number(e.target.value) })} className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/60" />
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                New Balance Origin
                <input type="number" value={form.newbalanceOrig} onChange={(e) => setForm({ ...form, newbalanceOrig: Number(e.target.value) })} className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/60" />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-300">
                Old Balance Destination
                <input type="number" value={form.oldbalanceDest} onChange={(e) => setForm({ ...form, oldbalanceDest: Number(e.target.value) })} className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/60" />
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                New Balance Destination
                <input type="number" value={form.newbalanceDest} onChange={(e) => setForm({ ...form, newbalanceDest: Number(e.target.value) })} className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/60" />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Balance Diff Origin</p>
                <p className="mt-2 text-xl font-semibold text-white">{payload.balanceDiffOrig}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Balance Diff Destination</p>
                <p className="mt-2 text-xl font-semibold text-white">{payload.balanceDiffDest}</p>
              </div>
            </div>
            <button type="submit" className="inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]">
              {loading ? 'Scoring transaction...' : 'Submit for Fraud Detection'}
            </button>
          </form>
        </div>

        <div className={`glass-card rounded-[32px] border border-white/10 p-6 shadow-soft ${result ? riskStyles[riskLevel] : ''}`}>
          <div className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            <span>Prediction Summary</span>
            {result ? (riskLevel === 'high' ? <AlertTriangle className="h-4 w-4" /> : riskLevel === 'medium' ? <ShieldAlert className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />) : null}
          </div>
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm text-slate-400">Status</p>
                <p className="mt-3 text-2xl font-semibold text-white">{statusLabel}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-sm text-slate-400">Risk Score</p>
                <p className="mt-3 text-2xl font-semibold text-white">{result ? `${Math.round(result.fraud_probability * 100)}%` : '—'}</p>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm text-slate-400">Fraud Probability</p>
              <p className="mt-3 text-4xl font-semibold text-white">{result ? result.fraud_probability.toFixed(2) : '—'}</p>
            </div>
            {error && (
              <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-5 text-sm text-rose-200">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LivePredictionPage;
