import { useMemo, useState } from 'react';
import { Download, UploadCloud } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';

const mockUploaded = [
  { id: 'T001', type: 'PAYMENT', amount: 45000, oldbalanceOrg: 85000, newbalanceOrig: 40000, oldbalanceDest: 0, newbalanceDest: 40000 },
  { id: 'T002', type: 'TRANSFER', amount: 128000, oldbalanceOrg: 256000, newbalanceOrig: 128000, oldbalanceDest: 0, newbalanceDest: 128000 },
  { id: 'T003', type: 'CASH_OUT', amount: 26500, oldbalanceOrg: 26500, newbalanceOrig: 0, oldbalanceDest: 98500, newbalanceDest: 26500 },
];

function BatchAnalysisPage() {
  const [records] = useState(mockUploaded);
  const totalFraud = useMemo(() => records.filter((row) => row.amount > 50000).length, [records]);
  const fraudPercent = useMemo(() => Math.round((totalFraud / records.length) * 100), [records, totalFraud]);

  return (
    <div className="space-y-8">
      <SectionTitle
        label="Batch analysis"
        title="Upload bulk transactions for scoring"
        subtitle="Evaluate an entire dataset in one shot, preview records, and export the classification results." 
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Total Transactions</p>
          <p className="mt-4 text-4xl font-semibold text-white">{records.length}</p>
        </div>
        <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Frauds Detected</p>
          <p className="mt-4 text-4xl font-semibold text-white">{totalFraud}</p>
        </div>
        <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Fraud Percentage</p>
          <p className="mt-4 text-4xl font-semibold text-white">{fraudPercent}%</p>
        </div>
      </div>

      <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">CSV upload</p>
            <h3 className="text-xl font-semibold text-white">Drag and drop transactions</h3>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-slate-900/80 px-5 py-3 text-sm text-slate-100 transition hover:bg-slate-800">
            <UploadCloud className="h-4 w-4" />
            Upload CSV
          </button>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70">
          <table className="w-full border-collapse text-left text-sm text-slate-300">
            <thead className="bg-slate-950/90 text-slate-400">
              <tr>
                <th className="px-6 py-4">Transaction</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {records.map((row) => (
                <tr key={row.id} className="hover:bg-slate-900/70 transition-colors duration-200">
                  <td className="px-6 py-4 font-semibold text-white">{row.id}</td>
                  <td className="px-6 py-4">{row.type}</td>
                  <td className="px-6 py-4">${row.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-emerald-300">Ready</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4 rounded-3xl bg-slate-950/80 p-6 shadow-soft">
          <div>
            <p className="text-sm text-slate-400">Export results</p>
            <p className="mt-2 text-lg font-semibold text-white">Download the scored transaction file</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]">
            <Download className="h-4 w-4" />
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
}

export default BatchAnalysisPage;
