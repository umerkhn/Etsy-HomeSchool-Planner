import { useCallback } from 'react';
import { usePlanner } from '../context/PlannerContext';

/**
 * Focused hook for a single field.
 * Returns [value, setValue] — components using this can be wrapped
 * in React.memo to avoid re-renders when unrelated fields change.
 */
export function useField(fieldKey, fallback = '') {
  const { getValue, updateField } = usePlanner();
  const value = getValue(fieldKey, fallback);
  const setValue = useCallback(
    (newValue) => updateField(fieldKey, newValue),
    [updateField, fieldKey]
  );
  return [value, setValue];
}
