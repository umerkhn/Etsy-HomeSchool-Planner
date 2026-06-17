import { useMemo } from 'react';
import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { INLINE_INPUT_CLASS, INLINE_TEXTAREA_CLASS } from '../Forms/formStyles';
import { Card } from '../UI/Card';

const ACTIVITIES = [0, 1];
const CHILD_INDICES = [1, 2, 3, 4];

export default function ExtracurricularsPage() {
  const { getValue, updateField, getChildName } = usePlanner();

  const totals = useMemo(() => {
    let totalHours = 0;
    let totalCost = 0;
    CHILD_INDICES.forEach((childIdx) => {
      ACTIVITIES.forEach((actIdx) => {
        const hoursVal = parseFloat(getValue(`extra_hours_c${childIdx}_a${actIdx}`, '0')) || 0;
        const costVal = parseFloat(getValue(`extra_cost_c${childIdx}_a${actIdx}`, '0')) || 0;
        totalHours += hoursVal;
        totalCost += costVal;
      });
    });
    return { hours: totalHours, cost: totalCost };
  }, [getValue]);

  return (
    <PageWrapper 
      title="Extracurriculars" 
      description="Track enrichment activities, hours, and investments per student."
    >
      <div className="space-y-8">
        {CHILD_INDICES.map((childIdx) => {
          const name = getChildName(childIdx) || `Student ${childIdx}`;
          const color = childColors[childIdx];

          return (
            <Card key={childIdx} className="border-l-4" style={{ borderLeftColor: color.hex }}>
              <div className="flex items-center gap-3 mb-6 border-b border-light-gray/40 pb-4">
                <div
                  className="w-8 h-8 rounded border border-light-gray shadow-sm flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: color.bg, color: color.hex }}
                >
                  {childIdx}
                </div>
                <h3 className="font-bold text-charcoal text-base">{name}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ACTIVITIES.map((actIdx) => {
                  const baseKey = `extra_c${childIdx}_a${actIdx}`;
                  return (
                    <div key={actIdx} className="bg-cream/30 p-4 rounded-xl border border-light-gray/40 space-y-4">
                      <h4 className="text-[11px] font-bold text-charcoal uppercase tracking-wider border-b border-light-gray/40 pb-2">
                        Activity {actIdx + 1}
                      </h4>

                      <div>
                        <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">
                          Activity Name
                        </label>
                        <input
                          type="text"
                          value={getValue(`${baseKey}_name`)}
                          onChange={(e) => updateField(`${baseKey}_name`, e.target.value)}
                          placeholder="e.g. Piano Lessons"
                          className={`${INLINE_INPUT_CLASS} bg-white shadow-sm font-medium`}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">
                            Cost (Annual/Term)
                          </label>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-bold text-medium-gray">$</span>
                            <input
                              type="number"
                              value={getValue(`extra_cost_c${childIdx}_a${actIdx}`)}
                              onChange={(e) => updateField(`extra_cost_c${childIdx}_a${actIdx}`, e.target.value)}
                              placeholder="0.00"
                              className={`${INLINE_INPUT_CLASS} bg-white shadow-sm font-mono`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">
                            Hours / Week
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            value={getValue(`extra_hours_c${childIdx}_a${actIdx}`)}
                            onChange={(e) => updateField(`extra_hours_c${childIdx}_a${actIdx}`, e.target.value)}
                            placeholder="e.g. 1.5"
                            className={`${INLINE_INPUT_CLASS} bg-white shadow-sm font-mono`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">
                            Duration / Dates
                          </label>
                          <input
                            type="text"
                            value={getValue(`${baseKey}_duration`)}
                            onChange={(e) => updateField(`${baseKey}_duration`, e.target.value)}
                            placeholder="e.g. Fall Term"
                            className={`${INLINE_INPUT_CLASS} bg-white shadow-sm`}
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">
                            Instructor / Coach
                          </label>
                          <input
                            type="text"
                            value={getValue(`${baseKey}_instructor`)}
                            onChange={(e) => updateField(`${baseKey}_instructor`, e.target.value)}
                            placeholder="Name"
                            className={`${INLINE_INPUT_CLASS} bg-white shadow-sm`}
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-light-gray/40">
                        <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">
                          Progress Notes & Outcomes
                        </label>
                        <textarea
                          value={getValue(`${baseKey}_notes`)}
                          onChange={(e) => updateField(`${baseKey}_notes`, e.target.value)}
                          placeholder="Accomplishments, levels achieved..."
                          rows={2}
                          className={`${INLINE_TEXTAREA_CLASS} bg-white shadow-sm`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}

        {/* Global Totals Summary */}
        <Card className="bg-charcoal text-white mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1">
              Enrichment Summary
            </h4>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">
              Cumulative weekly hours and total cost
            </p>
          </div>

          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <div className="bg-white/10 rounded-xl px-5 py-3 border border-white/10 flex-1 sm:flex-none text-center">
              <span className="text-white/60 block text-[10px] uppercase font-bold tracking-wider mb-1">Weekly Hours</span>
              <span className="text-white font-mono font-bold text-lg">{totals.hours} hrs</span>
            </div>
            <div className="bg-teal/20 rounded-xl px-5 py-3 border border-teal/20 flex-1 sm:flex-none text-center">
              <span className="text-teal/80 block text-[10px] uppercase font-bold tracking-wider mb-1">Total Cost</span>
              <span className="text-teal font-mono font-bold text-lg">${totals.cost.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
