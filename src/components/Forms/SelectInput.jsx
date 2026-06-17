import { usePlanner } from '../../context/PlannerContext';

export default function SelectInput({ field, label, options = [], className = '' }) {
  const { getValue, updateField } = usePlanner();
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-xs font-medium text-dark-gray">{label}</label>}
      <select
        value={getValue(field)}
        onChange={(e) => updateField(field, e.target.value)}
        className="border border-light-gray rounded-lg px-3 py-2 text-sm font-[Poppins] bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
}
