import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';

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
  while (weeks[weeks.length - 1].length < 7) {
    weeks[weeks.length - 1].push(null);
  }

  const key = `yag_${label.replace(/\s/g, '')}`;

  return (
    <Card className="p-4 bg-white hover:border-dark-gray/30 transition-colors">
      <h4 className="text-xs font-bold text-charcoal text-center mb-3 tracking-wide">{label}</h4>
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="text-[10px] font-semibold text-medium-gray text-center pb-1 border-b border-light-gray/60 mb-1">
            {d}
          </div>
        ))}
        {weeks.flat().map((day, i) => (
          <div key={i} className="text-center">
            {day ? (
              <button
                className="w-full h-6 text-[11px] rounded transition-all flex items-center justify-center hover:bg-light-gray/50 text-dark-gray"
                title={`Click to mark ${label} ${day}`}
                onClick={() => {
                  const eventKey = `${key}_${day}`;
                  const current = getValue(eventKey, '');
                  const next = current === '●' ? '' : '●';
                  updateField(eventKey, next);
                }}
              >
                {getValue(`${key}_${day}`, '') === '●' ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                ) : (
                  day
                )}
              </button>
            ) : (
              <span className="h-6 block" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function YearAtGlancePage() {
  return (
    <PageWrapper 
      title="2025–2026 Academic Year" 
      description="Click any date to mark it as a school day."
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {CALENDAR_MONTHS.map((m) => (
          <MiniCalendar key={m.label} {...m} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-xs">
        <Badge variant="primary" className="gap-1.5 px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          School Days
        </Badge>
        <Badge variant="coral" className="gap-1.5 px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-coral" />
          Breaks
        </Badge>
        <Badge variant="gold" className="gap-1.5 px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          Important Dates
        </Badge>
      </div>
    </PageWrapper>
  );
}
