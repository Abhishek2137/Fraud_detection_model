function SectionTitle({ label, title, subtitle }) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">{label}</p>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      {subtitle ? <p className="max-w-2xl text-sm text-slate-400">{subtitle}</p> : null}
    </div>
  );
}

export default SectionTitle;
