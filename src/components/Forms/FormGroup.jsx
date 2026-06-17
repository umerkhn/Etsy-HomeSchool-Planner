export default function FormGroup({ title, children, className = '' }) {
  return (
    <div className={`mb-6 ${className}`}>
      {title && (
        <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-3 pb-2 border-b border-light-gray">
          {title}
        </h3>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}
