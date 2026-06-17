import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';

const CALENDAR_MONTHS = [
  { label: 'AUG 2025', year: 2025, month: 7 },
  { label: 'SEP 2025', year: 2025, month: 8 },
  { label: 'OCT 2025', year: 2025, month: 9 },
  { label: 'NOV 2025', year: 2025, month: 10 },
  { label: 'DEC 2025', year: 2025, month: 11 },
  { label: 'JAN 2026', year: 2026, month: 0 },
  { label: 'FEB 2026', year: 2026, month: 1 },
  { label: 'MAR 2026', year: 2026, month: 2 },
  { label: 'APR 2026', year: 2026, month: 3 },
  { label: 'MAY 2026', year: 2026, month: 4 },
  { label: 'JUN 2026', year: 2026, month: 5 },
  { label: 'JUL 2026', year: 2026, month: 6 },
];

function MiniCalendar({ label, year, month }) {
  const { getValue, updateField } = usePlanner();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  // Fill last week
  while (weeks[weeks.length - 1].length < 7) {
    weeks[weeks.length - 1].push(null);
  }

  const key = `yag_${label.replace(/\s/g, '')}`;

  return (
    <div className="border border-light-gray rounded-xl p-3 bg-white">
      <h4 className="text-xs font-bold text-primary text-center mb-2">{label}</h4>
      <div className="grid grid-cols-7 gap-0">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="text-[9px] font-semibold text-medium-gray text-center py-0.5">
            {d}
          </div>
        ))}
        {weeks.flat().map((day, i) => (
          <div key={i} className="text-center">
            {day ? (
              <button
                className="w-full text-[10px] py-0.5 rounded hover:bg-primary/10 transition-colors text-charcoal"
                title={`Click to mark ${label} ${day}`}
                onClick={() => {
                  const eventKey = `${key}_${day}`;
                  const current = getValue(eventKey, '');
                  const next = current === '●' ? '' : '●';
                  updateField(eventKey, next);
                }}
              >
                {getValue(`${key}_${day}`, '') === '●' ? (
                  <span className="text-primary font-bold">●</span>
                ) : (
                  day
                )}
              </button>
            ) : (
              <span className="text-[10px] py-0.5">&nbsp;</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function YearAtGlancePage() {
  return (
    <PageWrapper title="2025–2026 Academic Year Overview" pageNum={4}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CALENDAR_MONTHS.map((m) => (
          <MiniCalendar key={m.label} {...m} />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs text-dark-gray">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span>School Days</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-coral" />
          <span>Breaks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-gold" />
          <span>Important Dates</span>
        </div>
      </div>

      <p className="text-xs text-medium-gray mt-3">
        Click any date to mark it as a school day (●). Click again to unmark.
      </p>
    </PageWrapper>
  );
}
