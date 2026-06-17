import { memo } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { INPUT_CLASS } from './formStyles';

export default memo(function DateInput({ field, label, className = '' }) {
  const { getValue, updateField } = usePlanner();
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-xs font-medium text-dark-gray">{label}</label>}
      <input
        type="date"
        value={getValue(field)}
        onChange={(e) => updateField(field, e.target.value)}
        className={INPUT_CLASS}
      />
    </div>
  );
});
