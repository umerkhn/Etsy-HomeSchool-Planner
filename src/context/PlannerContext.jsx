import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { loadData, saveData } from '../utils/storageManager';

const PlannerContext = createContext(null);

export function PlannerProvider({ children }) {
  const [data, setData] = useState(() => loadData());
  const [lastSaved, setLastSaved] = useState(null);
  const saveTimer = useRef(null);

  // Debounced auto-save (500ms)
  useEffect(() => {
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

  const clearAllData = useCallback(() => {
    setData({});
    localStorage.removeItem('homeschool_planner_data');
    setLastSaved(null);
  }, []);

  return (
    <PlannerContext.Provider
      value={{
        data,
        setData,
        updateField,
        updateFields,
        getValue,
        getChildName,
        getChildAge,
        clearAllData,
        lastSaved,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error('usePlanner must be used within PlannerProvider');
  return ctx;
}
