import { useMemo } from 'react';
import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { INLINE_INPUT_CLASS, INLINE_TEXTAREA_CLASS } from '../Forms/formStyles';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';

const PLANNED_TRIPS = Array.from({ length: 5 }, (_, i) => i);
const COMPLETED_LOGS = Array.from({ length: 3 }, (_, i) => i);
const CHILD_INDICES = [1, 2, 3, 4];

export default function FieldTripsPage() {
  const { getValue, updateField, getChildName } = usePlanner();

  const getPlannedTripTotal = (tripIdx) => {
    const costPerChild = parseFloat(getValue(`ft_planned_cost_${tripIdx}`, '0')) || 0;
    let kidsChecked = 0;
    CHILD_INDICES.forEach((childIdx) => {
      if (getValue(`ft_planned_kid_${tripIdx}_c${childIdx}`, false)) {
        kidsChecked++;
      }
    });
    return (costPerChild * kidsChecked).toFixed(2);
  };

  return (
    <PageWrapper 
      title="Field Trips" 
      description="Plan educational outings and log completed trip reflections."
    >
      <div className="space-y-12">
        {/* Planned Field Trips */}
        <div>
          <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-light-gray/60 pb-2">
            🎒 Planned Outings
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {PLANNED_TRIPS.map((tripIdx) => {
              const baseKey = `ft_planned_${tripIdx}`;
              const totalCost = getPlannedTripTotal(tripIdx);

              return (
                <Card key={tripIdx} className="space-y-4">
                  <h4 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-2">
                    Trip #{tripIdx + 1}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-cream/30 p-4 rounded-xl border border-light-gray/40">
                    <div>
                      <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Trip / Subject</label>
                      <input
                        type="text"
                        value={getValue(`${baseKey}_name`)}
                        onChange={(e) => updateField(`${baseKey}_name`, e.target.value)}
                        placeholder="e.g. Science Museum"
                        className={`${INLINE_INPUT_CLASS} bg-white shadow-sm font-medium`}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Destination</label>
                      <input
                        type="text"
                        value={getValue(`${baseKey}_dest`)}
                        onChange={(e) => updateField(`${baseKey}_dest`, e.target.value)}
                        placeholder="Address or venue"
                        className={`${INLINE_INPUT_CLASS} bg-white shadow-sm`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Date</label>
                      <input
                        type="date"
                        value={getValue(`${baseKey}_date`)}
                        onChange={(e) => updateField(`${baseKey}_date`, e.target.value)}
                        className={INLINE_INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Time</label>
                      <input
                        type="text"
                        value={getValue(`${baseKey}_time`)}
                        onChange={(e) => updateField(`${baseKey}_time`, e.target.value)}
                        placeholder="10:00 AM"
                        className={INLINE_INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Cost per Child</label>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] font-bold text-medium-gray">$</span>
                        <input
                          type="number"
                          value={getValue(`ft_planned_cost_${tripIdx}`)}
                          onChange={(e) => updateField(`ft_planned_cost_${tripIdx}`, e.target.value)}
                          placeholder="0.00"
                          className={`${INLINE_INPUT_CLASS} font-mono`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Total Cost</label>
                      <div className="bg-cream/50 rounded px-3 py-1.5 text-sm font-bold font-mono text-primary border border-light-gray/60 h-8 flex items-center">
                        ${totalCost}
                      </div>
                    </div>
                  </div>

                  <div className="py-3 border-t border-b border-light-gray/40 mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <span className="text-[10px] font-bold text-dark-gray uppercase tracking-wider shrink-0">Students Attending:</span>
                    <div className="flex flex-wrap gap-3">
                      {CHILD_INDICES.map((childIdx) => (
                        <label key={childIdx} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={!!getValue(`ft_planned_kid_${tripIdx}_c${childIdx}`, false)}
                            onChange={(e) => updateField(`ft_planned_kid_${tripIdx}_c${childIdx}`, e.target.checked)}
                            className="w-4 h-4 rounded border-light-gray text-charcoal focus:ring-charcoal/20"
                          />
                          <Badge variant="gray" style={{ backgroundColor: childColors[childIdx].bg, color: childColors[childIdx].hex, borderColor: childColors[childIdx].hex }}>
                            {getChildName(childIdx) || `Student ${childIdx}`}
                          </Badge>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Learning Focus</label>
                      <input
                        type="text"
                        value={getValue(`${baseKey}_focus`)}
                        onChange={(e) => updateField(`${baseKey}_focus`, e.target.value)}
                        placeholder="Tied academic standard..."
                        className={INLINE_INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Booking Status</span>
                      <div className="flex gap-4 items-center h-8">
                        <label className="flex items-center gap-2 text-xs font-semibold text-charcoal cursor-pointer">
                          <input
                            type="radio"
                            name={`ft_status_${tripIdx}`}
                            checked={getValue(`ft_status_${tripIdx}`) === 'filed'}
                            onChange={() => updateField(`ft_status_${tripIdx}`, 'filed')}
                            className="w-4 h-4 accent-charcoal"
                          />
                          <span>Booked</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs font-semibold text-charcoal cursor-pointer">
                          <input
                            type="radio"
                            name={`ft_status_${tripIdx}`}
                            checked={getValue(`ft_status_${tripIdx}`) === 'pending'}
                            onChange={() => updateField(`ft_status_${tripIdx}`, 'pending')}
                            className="w-4 h-4 accent-charcoal"
                          />
                          <span>Pending</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Field Trip Log */}
        <div>
          <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-light-gray/60 pb-2">
            📝 Completed Trip Log
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {COMPLETED_LOGS.map((logIdx) => {
              const baseKey = `ft_log_${logIdx}`;

              return (
                <Card key={logIdx} className="space-y-4">
                  <h4 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-2">
                    Log Entry #{logIdx + 1}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-cream/30 p-4 rounded-xl border border-light-gray/40">
                    <div className="sm:col-span-3">
                      <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Trip Name</label>
                      <input
                        type="text"
                        value={getValue(`${baseKey}_name`)}
                        onChange={(e) => updateField(`${baseKey}_name`, e.target.value)}
                        placeholder="Trip title"
                        className={`${INLINE_INPUT_CLASS} font-medium bg-white shadow-sm`}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Date Completed</label>
                      <input
                        type="date"
                        value={getValue(`${baseKey}_date`)}
                        onChange={(e) => updateField(`${baseKey}_date`, e.target.value)}
                        className={`${INLINE_INPUT_CLASS} bg-white shadow-sm`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Learning Outcomes & Highlights</label>
                    <textarea
                      value={getValue(`${baseKey}_outcomes`)}
                      onChange={(e) => updateField(`${baseKey}_outcomes`, e.target.value)}
                      placeholder="What was observed? Any special moments?"
                      rows={2}
                      className={INLINE_TEXTAREA_CLASS}
                    />
                  </div>

                  <div className="mt-4 pt-4 border-t border-light-gray/40">
                    <span className="text-[10px] font-bold text-charcoal uppercase tracking-wider block mb-3">
                      Student Reflections
                    </span>
                    <div className="space-y-2">
                      {CHILD_INDICES.map((childIdx) => {
                        const name = getChildName(childIdx) || `Student ${childIdx}`;
                        const color = childColors[childIdx];
                        return (
                          <div key={childIdx} className="flex flex-col sm:flex-row sm:items-center gap-3 p-2 bg-cream/20 rounded-lg border border-transparent hover:border-light-gray/60 transition-colors">
                            <label className="w-32 flex items-center gap-2 cursor-pointer group shrink-0">
                              <input
                                type="checkbox"
                                checked={!!getValue(`${baseKey}_c${childIdx}_att`, false)}
                                onChange={(e) => updateField(`${baseKey}_c${childIdx}_att`, e.target.checked)}
                                className="w-4 h-4 rounded border-light-gray text-charcoal focus:ring-charcoal/20"
                              />
                              <Badge variant="gray" style={{ backgroundColor: color.bg, color: color.hex, borderColor: color.hex }}>
                                {name}
                              </Badge>
                            </label>
                            <input
                              type="text"
                              value={getValue(`${baseKey}_c${childIdx}_reflection`)}
                              onChange={(e) => updateField(`${baseKey}_c${childIdx}_reflection`, e.target.value)}
                              placeholder={`What did ${name} like best?`}
                              className={`flex-1 ${INLINE_INPUT_CLASS} bg-white`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
