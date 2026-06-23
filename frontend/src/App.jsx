import { useMemo, useState } from 'react';
import { predictTransaction } from './services/api';
import Card from './components/ui/Card';
import SectionTitle from './components/ui/SectionTitle';

const transactionTypes = ['PAYMENT', 'TRANSFER', 'CASH_OUT', 'DEPOSITE'];

const stats = [
  { title: 'Transactions', value: '6.3M+' },
  { title: 'Fraud Detection Rate', value: '17.8%' },
  { title: 'Precision', value: '58%' },
  { title: 'Recall', value: '86%' },
];

function App() {
  const [form, setForm] = useState({
    type: 'PAYMENT',
    amount: 50000,
    oldbalanceOrg: 100000,
    newbalanceOrig: 50000,
    oldbalanceDest: 0,
    newbalanceDest: 50000,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const payload = useMemo(
    () => ({
      ...form,
      balanceDiffOrig: form.oldbalanceOrg - form.newbalanceOrig,
      balanceDiffDest: form.newbalanceDest - form.oldbalanceDest,
    }),
    [form]
  );

  const riskLevel = useMemo(() => {
    if (!result) return 'neutral';
    if (result.fraud_probability >= 0.8) return 'high';
    if (result.fraud_probability >= 0.45) return 'medium';
    return 'safe';
  }, [result]);

  const statusLabel = useMemo(() => {
    if (!result) return 'Awaiting prediction';
    return result.prediction === 1 ? 'High risk fraud' : 'Legitimate transaction';
  }, [result]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await predictTransaction(payload);
      setResult(response);
    } catch (err) {
      setError('Unable to connect to the fraud API. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="app-container">
        <section className="hero-card">
          <span className="eyebrow">FraudGuard AI</span>
          <h1 className="hero-title">Modern fraud scoring, simplified.</h1>
          <p className="hero-text">
            Submit a transaction and get a fast fraud prediction with confidence.
            This single-page dashboard is designed to make scoring easy and beautiful.
          </p>
        </section>

        <div className="section-grid">
          <section className="panel panel-form">
            <div className="section-heading">
              <SectionTitle
                label="Live prediction"
                title="Score a transaction"
                subtitle="Send transaction details to the backend model for instant fraud inference."
              />
            </div>

            <form className="fraud-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label className="field-label">
                  Transaction type
                  <select
                    value={form.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="field-input"
                  >
                    {transactionTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field-label">
                  Amount
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(e) => handleChange('amount', Number(e.target.value))}
                    className="field-input"
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="field-label">
                  Old balance origin
                  <input
                    type="number"
                    value={form.oldbalanceOrg}
                    onChange={(e) => handleChange('oldbalanceOrg', Number(e.target.value))}
                    className="field-input"
                  />
                </label>
                <label className="field-label">
                  New balance origin
                  <input
                    type="number"
                    value={form.newbalanceOrig}
                    onChange={(e) => handleChange('newbalanceOrig', Number(e.target.value))}
                    className="field-input"
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="field-label">
                  Old balance destination
                  <input
                    type="number"
                    value={form.oldbalanceDest}
                    onChange={(e) => handleChange('oldbalanceDest', Number(e.target.value))}
                    className="field-input"
                  />
                </label>
                <label className="field-label">
                  New balance destination
                  <input
                    type="number"
                    value={form.newbalanceDest}
                    onChange={(e) => handleChange('newbalanceDest', Number(e.target.value))}
                    className="field-input"
                  />
                </label>
              </div>

              <div className="form-row">
                <div className="value-box">
                  <span className="value-label">Balance diff origin</span>
                  <strong className="value-number">{payload.balanceDiffOrig}</strong>
                </div>
                <div className="value-box">
                  <span className="value-label">Balance diff destination</span>
                  <strong className="value-number">{payload.balanceDiffDest}</strong>
                </div>
              </div>

              <button type="submit" className="button-primary" disabled={loading}>
                {loading ? 'Scoring transaction...' : 'Submit for fraud detection'}
              </button>
            </form>

            {error && <div className="alert">{error}</div>}
          </section>

          <aside className="panel panel-summary">
            <div className="summary-head">
              <span className="eyebrow">Prediction summary</span>
              <h2 className="summary-title">Instant fraud insight</h2>
              <p className="summary-copy">
                The model returns a fraud probability score and a final prediction.
              </p>
            </div>

            <div className="summary-metrics">
              <div className={`result-box result-${riskLevel}`}>
                <p>Risk score</p>
                <div className="result-value">{result ? `${Math.round(result.fraud_probability * 100)}%` : '—'}</div>
                <p className="result-sub">Probability from the fraud model</p>
              </div>
              <div className="result-box result-neutral">
                <p>Model verdict</p>
                <div className="result-value">{result ? (result.prediction === 1 ? 'Fraud' : 'Legit') : 'Awaiting data'}</div>
                <p className="result-sub">Clear classification outcome</p>
              </div>
            </div>

            <div className="stats-grid">
              {stats.map((item) => (
                <Card key={item.title} title={item.title} value={item.value} className="stat-card" />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
