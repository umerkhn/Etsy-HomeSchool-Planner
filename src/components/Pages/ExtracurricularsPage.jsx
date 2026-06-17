import { useMemo } from 'react';
import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { INLINE_INPUT_CLASS, INLINE_TEXTAREA_CLASS } from '../Forms/formStyles';

// Hoisted to module scope
const ACTIVITIES = [0, 1];
const CHILD_INDICES = [1, 2, 3, 4];
export default function ExtracurricularsPage() {
  const { getValue, updateField, getChildName } = usePlanner();


  // Memoized totals calculation
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
    <PageWrapper title="Extracurricular Activities & Enrichment" pageNum={61}>
      <div className="space-y-8">
        {CHILD_INDICES.map((childIdx) => {
          const name = getChildName(childIdx);
          const color = childColors[childIdx];

          return (
            <div
              key={childIdx}
              className="bg-white rounded-2xl p-6 border-l-4 shadow-sm border-light-gray"
              style={{ borderLeftColor: color.hex }}
            >
              <h3 className="text-lg font-bold text-charcoal mb-4">{name}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ACTIVITIES.map((actIdx) => {
                  const baseKey = `extra_c${childIdx}_a${actIdx}`;
                  return (
                    <div
                      key={actIdx}
                      className="border border-cream rounded-xl p-4 bg-cream/20 space-y-3"
                    >
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                        Activity {actIdx + 1}
                      </h4>

                      <div>
                        <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                          Activity Name
                        </label>
                        <input
                          type="text"
                          value={getValue(`${baseKey}_name`)}
                          onChange={(e) => updateField(`${baseKey}_name`, e.target.value)}
                          placeholder="e.g. Piano Lessons, Gymnastics"
                          className="w-full border border-light-gray rounded px-2.5 py-1 text-xs outline-none focus:border-primary bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                            Cost (Annual/Term)
                          </label>
                          <div className="flex items-center">
                            <span className="text-xs text-medium-gray mr-1">$</span>
                            <input
                              type="number"
                              value={getValue(`extra_cost_c${childIdx}_a${actIdx}`)}
                              onChange={(e) => updateField(`extra_cost_c${childIdx}_a${actIdx}`, e.target.value)}
                              placeholder="0.00"
                              className="w-full border border-light-gray rounded px-2 py-1 text-xs outline-none focus:border-primary bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                            Hours per Week
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            value={getValue(`extra_hours_c${childIdx}_a${actIdx}`)}
                            onChange={(e) => updateField(`extra_hours_c${childIdx}_a${actIdx}`, e.target.value)}
                            placeholder="e.g. 1.5"
                            className="w-full border border-light-gray rounded px-2 py-1 text-xs outline-none focus:border-primary bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                            Duration / Dates
                          </label>
                          <input
                            type="text"
                            value={getValue(`${baseKey}_duration`)}
                            onChange={(e) => updateField(`${baseKey}_duration`, e.target.value)}
                            placeholder="e.g. Fall Term"
                            className="w-full border border-light-gray rounded px-2 py-1 text-xs outline-none focus:border-primary bg-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                            Instructor / Coach
                          </label>
                          <input
                            type="text"
                            value={getValue(`${baseKey}_instructor`)}
                            onChange={(e) => updateField(`${baseKey}_instructor`, e.target.value)}
                            placeholder="Name"
                            className="w-full border border-light-gray rounded px-2 py-1 text-xs outline-none focus:border-primary bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                          Progress Notes & Key Outcomes
                        </label>
                        <textarea
                          value={getValue(`${baseKey}_notes`)}
                          onChange={(e) => updateField(`${baseKey}_notes`, e.target.value)}
                          placeholder="Accomplishments, levels achieved, general observations..."
                          rows={2}
                          className="w-full border border-light-gray rounded p-2 text-xs bg-white outline-none focus:border-primary resize-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Global Totals Summary */}
        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-primary uppercase tracking-wider">
              Weekly Enrichment Summary
            </h4>
            <p className="text-xs text-dark-gray mt-0.5">
              Cumulative calculations for extracurricular investment and hours
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white rounded-xl px-5 py-3 text-center border border-light-gray shadow-sm min-w-36">
              <span className="text-medium-gray block text-[10px] uppercase font-semibold">Weekly Hours</span>
              <span className="text-primary font-bold text-xl">{totals.hours} hrs</span>
            </div>
            <div className="bg-white rounded-xl px-5 py-3 text-center border border-light-gray shadow-sm min-w-36">
              <span className="text-medium-gray block text-[10px] uppercase font-semibold">Total Cost</span>
              <span className="text-teal font-bold text-xl">${totals.cost.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
