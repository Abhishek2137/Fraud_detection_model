function Card({ title, value, children, className = '' }) {
  return (
    <div className={`glass-card rounded-[32px] border border-white/10 p-6 shadow-soft ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</p>
        <span className="text-xs text-slate-500">Live</span>
      </div>
      <div className="space-y-3">
        <p className="text-4xl font-semibold text-white">{value}</p>
        <div className="text-sm text-slate-400">{children}</div>
      </div>
    </div>
  );
}

export default Card;
