export function Card({ children, className = '', noPadding = false }) {
  return (
    <div className={`bg-white border border-light-gray rounded-xl shadow-sm overflow-hidden ${noPadding ? '' : 'p-6'} ${className}`}>
      {children}
    </div>
  );
}
