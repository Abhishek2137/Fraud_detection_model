function Button({ children, className = '', ...props }) {
  return (
    <button className={`rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
