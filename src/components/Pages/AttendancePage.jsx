import { useState, useMemo } from 'react';
import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { MONTHS } from '../../utils/pageRegistry';
import { childColors } from '../../utils/colorSystem';
import { INLINE_TEXTAREA_CLASS } from '../Forms/formStyles';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const CHILD_INDICES = [1, 2, 3, 4];
const WEEK_INDICES = [1, 2, 3, 4];
const DAY_INDICES = [0, 1, 2, 3, 4];
const STATUSES = [
  { key: 'P', label: 'Present', color: 'bg-teal/10 text-teal border-teal/20 hover:bg-teal/20' },
  { key: 'A', label: 'Absent', color: 'bg-coral/10 text-coral border-coral/20 hover:bg-coral/20' },
  { key: 'S', label: 'Sick', color: 'bg-gold/10 text-gold-dark border-gold/30 hover:bg-gold/20' },
  { key: 'E', label: 'Excused', color: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20' },
];

export default function AttendancePage() {
  const { getValue, updateField, getChildName } = usePlanner();
  const [selectedMonth, setSelectedMonth] = useState('aug2025');

  const currentMonthObj = MONTHS.find((m) => m.key === selectedMonth) || MONTHS[0];

  const getDayValue = (childIdx, weekIdx, dayIdx) => {
    return getValue(`att_${selectedMonth}_c${childIdx}_w${weekIdx}_d${dayIdx}`, 'P');
  };

  const toggleDay = (childIdx, weekIdx, dayIdx) => {
    const current = getDayValue(childIdx, weekIdx, dayIdx);
    const currentIndex = STATUSES.findIndex((s) => s.key === current);
    const nextIndex = (currentIndex + 1) % STATUSES.length;
    updateField(`att_${selectedMonth}_c${childIdx}_w${weekIdx}_d${dayIdx}`, STATUSES[nextIndex].key);
  };

  const monthTotals = useMemo(() => {
    const result = {};
    CHILD_INDICES.forEach((childIdx) => {
      let present = 0, absent = 0, sick = 0, excused = 0;
      for (let w = 1; w <= 4; w++) {
        for (let d = 0; d < 5; d++) {
          const val = getValue(`att_${selectedMonth}_c${childIdx}_w${w}_d${d}`, 'P');
          if (val === 'P') present++;
          else if (val === 'A') absent++;
          else if (val === 'S') sick++;
          else if (val === 'E') excused++;
        }
      }
      result[childIdx] = { present, absent, sick, excused };
    });
    return result;
  }, [getValue, selectedMonth]);

  const yearTotals = useMemo(() => {
    const result = {};
    CHILD_INDICES.forEach((childIdx) => {
      let present = 0, absent = 0, sick = 0, excused = 0;
      MONTHS.forEach((m) => {
        for (let w = 1; w <= 4; w++) {
          for (let d = 0; d < 5; d++) {
            const val = getValue(`att_${m.key}_c${childIdx}_w${w}_d${d}`, 'P');
            if (val === 'P') present++;
            else if (val === 'A') absent++;
            else if (val === 'S') sick++;
            else if (val === 'E') excused++;
          }
        }
      });
      result[childIdx] = { present, absent, sick, excused };
    });
    return result;
  }, [getValue]);

  return (
    <PageWrapper title="Attendance Tracker" description="Track daily attendance, absences, and sick days.">
      
      {/* Segmented Control for Months */}
      <div className="flex flex-wrap gap-1 mb-8 bg-light-gray/30 p-1.5 rounded-xl w-fit">
        {MONTHS.map((m) => (
          <button
            key={m.key}
            onClick={() => setSelectedMonth(m.key)}
            className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all uppercase tracking-wider ${
              selectedMonth === m.key
                ? 'bg-white text-charcoal shadow-sm'
                : 'text-medium-gray hover:text-dark-gray'
            }`}
          >
            {m.label.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {CHILD_INDICES.map((childIdx) => {
          const name = getChildName(childIdx) || `Student ${childIdx}`;
          const color = childColors[childIdx];
          const monthStats = monthTotals[childIdx];
          const yearStats = yearTotals[childIdx];

          return (
            <Card key={childIdx} className="border-l-4 overflow-visible" style={{ borderLeftColor: color.hex }}>
              <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8 border-b border-light-gray/40 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded border border-light-gray shadow-sm flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: color.bg, color: color.hex }}
                  >
                    {childIdx}
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-base">{name}</h3>
                    <p className="text-[10px] text-medium-gray uppercase tracking-wider mt-0.5">
                      {currentMonthObj.label} Record
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="bg-cream/40 rounded-lg px-3 py-2 border border-light-gray/60 flex items-center gap-4">
                    <span className="text-[10px] font-bold text-medium-gray uppercase tracking-wider">This Month</span>
                    <div className="flex gap-2 text-xs font-bold font-mono">
                      <span className="text-teal">{monthStats.present}P</span>
                      <span className="text-coral">{monthStats.absent}A</span>
                      <span className="text-gold-dark">{monthStats.sick}S</span>
                      <span className="text-primary">{monthStats.excused}E</span>
                    </div>
                  </div>
                  <div className="bg-charcoal text-white rounded-lg px-3 py-2 flex items-center gap-4 shadow-sm">
                    <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">YTD Total</span>
                    <div className="flex gap-2 text-xs font-bold font-mono">
                      <span className="text-teal">{yearStats.present}P</span>
                      <span className="text-coral">{yearStats.absent + yearStats.sick + yearStats.excused} Out</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {WEEK_INDICES.map((weekIdx) => (
                  <div key={weekIdx} className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 bg-cream/20 rounded-xl border border-transparent hover:border-light-gray/60 transition-colors">
                    <div className="w-16">
                      <Badge variant="gray">Week {weekIdx}</Badge>
                    </div>
                    <div className="flex-1 flex gap-2 justify-between max-w-lg">
                      {DAYS.map((dayName, dayIdx) => {
                        const val = getDayValue(childIdx, weekIdx, dayIdx);
                        const statusObj = STATUSES.find((s) => s.key === val) || STATUSES[0];
                        return (
                          <div key={dayIdx} className="flex flex-col items-center flex-1 group">
                            <span className="text-[9px] font-bold text-medium-gray uppercase tracking-wider mb-1.5">{dayName}</span>
                            <button
                              onClick={() => toggleDay(childIdx, weekIdx, dayIdx)}
                              className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold border transition-all shadow-sm ${statusObj.color}`}
                              title="Toggle Status"
                            >
                              {val}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-24 text-right pt-6 sm:pt-0">
                      <span className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block">Present</span>
                      <span className="text-sm font-bold text-teal font-mono">
                        {DAY_INDICES.filter((d) => getDayValue(childIdx, weekIdx, d) === 'P').length} / 5
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-cream/30">
            <h4 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-4">Status Legend</h4>
            <div className="grid grid-cols-2 gap-3">
              {STATUSES.map((s) => (
                <div key={s.key} className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${s.color}`}>
                    {s.key}
                  </span>
                  <span className="text-xs font-semibold text-dark-gray">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-medium-gray mt-5 border-t border-light-gray/60 pt-3">
              Click the day bubble to cycle through status options.
            </p>
          </Card>

          <Card className="bg-cream/30">
            <h4 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-3">Monthly Notes</h4>
            <textarea
              value={getValue(`att_notes_${selectedMonth}`, '')}
              onChange={(e) => updateField(`att_notes_${selectedMonth}`, e.target.value)}
              placeholder="Holidays, make-up days, patterns..."
              rows={5}
              className={INLINE_TEXTAREA_CLASS}
            />
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
