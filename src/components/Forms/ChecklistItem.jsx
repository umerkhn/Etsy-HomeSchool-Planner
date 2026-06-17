import { usePlanner } from '../../context/PlannerContext';

export default function ChecklistItem({ field, label, className = '' }) {
  const { getValue, updateField } = usePlanner();
  const checked = getValue(field, false);
  return (
    <label className={`flex items-start gap-3 cursor-pointer group py-1 ${className}`}>
      <div className="relative mt-0.5 flex-shrink-0">
        <input
          type="checkbox"
          checked={!!checked}
          onChange={(e) => updateField(field, e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            checked
              ? 'bg-primary border-primary'
              : 'border-medium-gray group-hover:border-primary'
          }`}
        >
          {checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span className={`text-sm ${checked ? 'line-through text-medium-gray' : 'text-charcoal'}`}>{label}</span>
    </label>
  );
}
