import { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { loadData, saveData, clearData } from '../utils/storageManager';

const PlannerContext = createContext(null);

export function PlannerProvider({ children }) {
  const [data, setData] = useState(() => loadData());
  const [lastSaved, setLastSaved] = useState(null);
  const saveTimer = useRef(null);
  const isInitialMount = useRef(true);

  // Debounced auto-save (500ms) — skip initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveData(data);
      setLastSaved(new Date());
    }, 500);
    return () => clearTimeout(saveTimer.current);
  }, [data]);

  const updateField = useCallback((key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateFields = useCallback((obj) => {
    setData((prev) => ({ ...prev, ...obj }));
  }, []);

  const clearAllData = useCallback(() => {
    setData({});
    clearData();
    setLastSaved(null);
  }, []);

  // Stable actions object — never changes reference
  const actions = useMemo(
    () => ({ updateField, updateFields, clearAllData }),
    [updateField, updateFields, clearAllData]
  );

  // Context value: data changes, actions stay stable
  const value = useMemo(
    () => ({ data, actions, lastSaved }),
    [data, actions, lastSaved]
  );

  return (
    <PlannerContext.Provider value={value}>
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error('usePlanner must be used within PlannerProvider');

  const { data, actions, lastSaved } = ctx;

  // Derived helpers — stable callbacks that read from current data
  const getValue = useCallback(
    (key, fallback = '') => {
      return data[key] !== undefined ? data[key] : fallback;
    },
    [data]
  );

  const getChildName = useCallback(
    (index) => data[`child${index}Name`] || `Child ${index}`,
    [data]
  );

  const getChildAge = useCallback(
    (index) => data[`child${index}Age`] || '',
    [data]
  );

  return {
    data,
    ...actions,
    getValue,
    getChildName,
    getChildAge,
    lastSaved,
  };
}
