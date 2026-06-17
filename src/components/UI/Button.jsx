export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-charcoal text-white hover:bg-primary-light focus:ring-charcoal/20 border border-transparent shadow-sm',
    secondary: 'bg-white text-charcoal border border-light-gray hover:bg-cream focus:ring-light-gray',
    ghost: 'bg-transparent text-dark-gray hover:bg-cream hover:text-charcoal focus:ring-light-gray',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
