import { memo } from 'react';
import { usePlanner } from '../../context/PlannerContext';
import { TEXTAREA_CLASS } from './formStyles';

export default memo(function TextArea({ field, placeholder, label, rows = 4, className = '' }) {
  const { getValue, updateField } = usePlanner();
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-xs font-medium text-dark-gray">{label}</label>}
      <textarea
        value={getValue(field)}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder || ''}
        rows={rows}
        className={TEXTAREA_CLASS}
      />
    </div>
  );
});
