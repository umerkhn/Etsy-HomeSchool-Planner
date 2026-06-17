import { memo } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { SELECT_CLASS } from './formStyles';

export default memo(function SelectInput({ field, label, options = [], className = '' }) {
  const { getValue, updateField } = usePlanner();
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-xs font-medium text-dark-gray">{label}</label>}
      <select
        value={getValue(field)}
        onChange={(e) => updateField(field, e.target.value)}
        className={SELECT_CLASS}
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
});
