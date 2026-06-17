import { useState } from 'react';
import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { MONTHS } from '../../utils/pageRegistry';
import { childColors } from '../../utils/colorSystem';

export default function AttendancePage() {
  const { getValue, updateField, getChildName } = usePlanner();
  const [selectedMonth, setSelectedMonth] = useState('aug2025');

  const currentMonthObj = MONTHS.find((m) => m.key === selectedMonth) || MONTHS[0];

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const STATUSES = [
    { key: 'P', label: 'Present', color: 'bg-teal/20 text-teal border-teal/40' },
    { key: 'A', label: 'Absent', color: 'bg-coral/20 text-coral border-coral/40' },
    { key: 'S', label: 'Sick', color: 'bg-gold/20 text-gold border-gold/40' },
    { key: 'E', label: 'Excused', color: 'bg-primary/20 text-primary border-primary/40' },
  ];

  const getDayValue = (childIdx, weekIdx, dayIdx) => {
    return getValue(`att_${selectedMonth}_c${childIdx}_w${weekIdx}_d${dayIdx}`, 'P'); // Default to Present
  };

  const toggleDay = (childIdx, weekIdx, dayIdx) => {
    const current = getDayValue(childIdx, weekIdx, dayIdx);
    const currentIndex = STATUSES.findIndex((s) => s.key === current);
    // Cycle: P -> A -> S -> E -> P
    const nextIndex = (currentIndex + 1) % STATUSES.length;
    updateField(`att_${selectedMonth}_c${childIdx}_w${weekIdx}_d${dayIdx}`, STATUSES[nextIndex].key);
  };

  // Calculate totals for a child in the selected month
  const getMonthTotals = (childIdx) => {
    let present = 0;
    let absent = 0;
    let sick = 0;
    let excused = 0;

    for (let w = 1; w <= 4; w++) {
      for (let d = 0; d < 5; d++) {
        const val = getDayValue(childIdx, w, d);
        if (val === 'P') present++;
        else if (val === 'A') absent++;
        else if (val === 'S') sick++;
        else if (val === 'E') excused++;
      }
    }

    return { present, absent, sick, excused };
  };

  // Calculate yearly totals for a child
  const getYearlyTotals = (childIdx) => {
    let present = 0;
    let absent = 0;
    let sick = 0;
    let excused = 0;

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

    return { present, absent, sick, excused };
  };

  return (
    <PageWrapper title="Attendance Record 2025–2026" pageNum={57}>
      {/* Month Selector Tabs */}
      <div className="flex flex-wrap gap-1 mb-8 border-b border-light-gray pb-2 justify-center sm:justify-start">
        {MONTHS.map((m) => (
          <button
            key={m.key}
            onClick={() => setSelectedMonth(m.key)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedMonth === m.key
                ? 'bg-primary text-white shadow-sm'
                : 'text-dark-gray hover:bg-light-gray/50 hover:text-charcoal'
            }`}
          >
            {m.label.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {[1, 2, 3, 4].map((childIdx) => {
          const name = getChildName(childIdx);
          const color = childColors[childIdx];
          const monthStats = getMonthTotals(childIdx);
          const yearStats = getYearlyTotals(childIdx);

          return (
            <div
              key={childIdx}
              className="bg-white rounded-2xl p-6 border-l-4 shadow-sm border-light-gray"
              style={{ borderLeftColor: color.hex }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-charcoal">{name}</h3>
                  <p className="text-xs text-medium-gray mt-0.5">
                    Attendance tracking for {currentMonthObj.label}
                  </p>
                </div>

                {/* Stats summary */}
                <div className="flex gap-4 text-xs font-semibold">
                  <div className="bg-cream rounded-xl px-3 py-2 text-center border border-light-gray">
                    <span className="text-dark-gray block font-normal text-[10px] uppercase">This Month</span>
                    <span className="text-teal">{monthStats.present}P</span>
                    <span className="text-medium-gray mx-1">/</span>
                    <span className="text-coral">{monthStats.absent}A</span>
                    <span className="text-medium-gray mx-1">/</span>
                    <span className="text-gold">{monthStats.sick}S</span>
                    <span className="text-medium-gray mx-1">/</span>
                    <span className="text-primary">{monthStats.excused}E</span>
                  </div>
                  <div className="bg-primary/5 rounded-xl px-3 py-2 text-center border border-primary/10">
                    <span className="text-primary block font-normal text-[10px] uppercase">Yearly Total</span>
                    <span className="text-teal">{yearStats.present} Present</span>
                    <span className="text-medium-gray mx-2">|</span>
                    <span className="text-coral">{yearStats.absent + yearStats.sick + yearStats.excused} Absent</span>
                  </div>
                </div>
              </div>

              {/* Attendance Grid */}
              <div className="space-y-3">
                {[1, 2, 3, 4].map((weekIdx) => (
                  <div key={weekIdx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center py-2 border-b border-cream">
                    <div className="sm:col-span-3 text-xs font-semibold text-dark-gray">
                      Week {weekIdx}
                    </div>
                    <div className="sm:col-span-6 flex gap-2 justify-between max-w-md">
                      {DAYS.map((dayName, dayIdx) => {
                        const val = getDayValue(childIdx, weekIdx, dayIdx);
                        const statusObj = STATUSES.find((s) => s.key === val) || STATUSES[0];
                        return (
                          <div key={dayIdx} className="flex flex-col items-center flex-1">
                            <span className="text-[10px] font-medium text-medium-gray mb-1">{dayName}</span>
                            <button
                              onClick={() => toggleDay(childIdx, weekIdx, dayIdx)}
                              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border transition-all shadow-sm ${statusObj.color}`}
                              title="Click to toggle status (P -> A -> S -> E)"
                            >
                              {val}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <div className="sm:col-span-3 text-right text-xs text-dark-gray">
                      Present: <span className="font-bold text-teal">
                        {[0, 1, 2, 3, 4].filter((d) => getDayValue(childIdx, weekIdx, d) === 'P').length} / 5 days
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Legend & Notes */}
        <div className="mt-8 pt-6 border-t border-light-gray grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3">Legend</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STATUSES.map((s) => (
                <div key={s.key} className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${s.color}`}>
                    {s.key}
                  </span>
                  <span className="text-xs font-medium text-dark-gray">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-medium-gray mt-4 italic">
              * Click on the day bubble to cycle through status: Present (P), Absent (A), Sick (S), and Excused (E).
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Monthly Attendance Notes</h4>
            <textarea
              value={getValue(`att_notes_${selectedMonth}`, '')}
              onChange={(e) => updateField(`att_notes_${selectedMonth}`, e.target.value)}
              placeholder="Enter notes about attendance, holidays, make-up days, etc."
              rows={3}
              className="w-full border border-light-gray rounded-xl p-3 text-xs bg-white outline-none focus:border-primary transition-all resize-none"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
