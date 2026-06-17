export function Badge({ children, variant = 'gray', className = '' }) {
  const variants = {
    gray: 'bg-cream text-dark-gray border-light-gray',
    primary: 'bg-charcoal text-white border-charcoal',
    coral: 'bg-coral-bg text-coral border-coral-light',
    sage: 'bg-sage-bg text-sage border-sage-light',
    gold: 'bg-gold-bg text-gold border-gold-light',
    lavender: 'bg-lavender-bg text-lavender border-lavender-light',
    teal: 'bg-teal/10 text-teal border-teal/20',
  };

  const style = variants[variant] || variants.gray;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${style} ${className}`}>
      {children}
    </span>
  );
}
