import { usePlanner } from '../../context/PlannerContext';

export default function SaveIndicator() {
  const { lastSaved } = usePlanner();

  if (!lastSaved) return null;

  return (
    <div className="save-indicator flex items-center gap-1.5 text-xs text-teal animate-pulse-save">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span>Saved</span>
    </div>
  );
}
