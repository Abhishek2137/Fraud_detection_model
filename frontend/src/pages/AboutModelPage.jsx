import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';

const stats = [
  { label: 'Dataset Size', value: '6.3M+' },
  { label: 'Model', value: 'XGBoost' },
  { label: 'Precision', value: '58%' },
  { label: 'Recall', value: '86%' },
  { label: 'F1 Score', value: '69%' },
];

function AboutModelPage() {
  return (
    <div className="space-y-8">
      <SectionTitle
        label="About model"
        title="FraudGuard AI predictive engine"
        subtitle="A commercial-grade fraud model trained on millions of transactions for precision detection and enterprise readiness."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        {stats.map((item) => (
          <Card key={item.label} title={item.label} value={item.value}>
            <span>Production-grade statistic</span>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
          <h3 className="mb-4 text-xl font-semibold text-white">Model architecture</h3>
          <p className="mb-4 text-slate-400">FraudGuard AI uses a gradient boosted decision tree model built with XGBoost. The engine is tuned for high recall on rare fraud signals while maintaining strong precision in production.</p>
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm text-slate-400">Feature set</p>
              <p className="mt-3 text-white">Transaction type, amount, account balances, and engineered balance differentials.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm text-slate-400">Deployment</p>
              <p className="mt-3 text-white">API-first model scoring for fintech workflows, fraud ops, and risk monitoring.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm text-slate-400">Compliance</p>
              <p className="mt-3 text-white">Designed for transparent risk decisioning and enterprise-grade monitoring.</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-soft">
          <h3 className="mb-4 text-xl font-semibold text-white">Why FraudGuard AI</h3>
          <ul className="space-y-3 text-slate-300">
            <li className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">Real-time scoring with clear fraud probability.</li>
            <li className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">Enterprise-ready charts, risk summaries, and audit-friendly reports.</li>
            <li className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">Batch scoring designed for fraud screening and operational response.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutModelPage;
