import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';

export default function FieldTripsPage() {
  const { getValue, updateField, getChildName } = usePlanner();

  const PLANNED_TRIPS = Array.from({ length: 5 }, (_, i) => i);
  const COMPLETED_LOGS = Array.from({ length: 3 }, (_, i) => i);

  // Helper to calculate total cost for a planned trip
  const getPlannedTripTotal = (tripIdx) => {
    const costPerChild = parseFloat(getValue(`ft_planned_cost_${tripIdx}`, '0')) || 0;
    let kidsChecked = 0;
    [1, 2, 3, 4].forEach((childIdx) => {
      if (getValue(`ft_planned_kid_${tripIdx}_c${childIdx}`, false)) {
        kidsChecked++;
      }
    });
    return (costPerChild * kidsChecked).toFixed(2);
  };

  return (
    <PageWrapper title="Field Trips & Educational Outings" pageNum={62}>
      <div className="space-y-12">
        {/* Planned Field Trips */}
        <div>
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6 pb-2 border-b border-light-gray">
            🎒 Planned Field Trips
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {PLANNED_TRIPS.map((tripIdx) => {
              const baseKey = `ft_planned_${tripIdx}`;
              const totalCost = getPlannedTripTotal(tripIdx);

              return (
                <div key={tripIdx} className="bg-white rounded-2xl p-6 border border-light-gray shadow-sm space-y-4">
                  <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                    Planned Trip {tripIdx + 1}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-semibold text-dark-gray block mb-1">Trip / Subject</label>
                      <input
                        type="text"
                        value={getValue(`${baseKey}_name`)}
                        onChange={(e) => updateField(`${baseKey}_name`, e.target.value)}
                        placeholder="e.g. Science Museum Outing"
                        className="w-full border border-light-gray rounded px-3 py-1.5 text-xs outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-dark-gray block mb-1">Destination</label>
                      <input
                        type="text"
                        value={getValue(`${baseKey}_dest`)}
                        onChange={(e) => updateField(`${baseKey}_dest`, e.target.value)}
                        placeholder="Address or venue"
                        className="w-full border border-light-gray rounded px-3 py-1.5 text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[10px] font-semibold text-dark-gray block mb-1">Date</label>
                      <input
                        type="date"
                        value={getValue(`${baseKey}_date`)}
                        onChange={(e) => updateField(`${baseKey}_date`, e.target.value)}
                        className="w-full border border-light-gray rounded px-3 py-1.5 text-xs outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-dark-gray block mb-1">Time</label>
                      <input
                        type="text"
                        value={getValue(`${baseKey}_time`)}
                        onChange={(e) => updateField(`${baseKey}_time`, e.target.value)}
                        placeholder="e.g. 10:00 AM"
                        className="w-full border border-light-gray rounded px-3 py-1.5 text-xs outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-dark-gray block mb-1">Cost per Child</label>
                      <div className="flex items-center">
                        <span className="text-xs text-medium-gray mr-1">$</span>
                        <input
                          type="number"
                          value={getValue(`ft_planned_cost_${tripIdx}`)}
                          onChange={(e) => updateField(`ft_planned_cost_${tripIdx}`, e.target.value)}
                          placeholder="0.00"
                          className="w-full border border-light-gray rounded px-3 py-1.5 text-xs outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-dark-gray block mb-1">Total Trip Cost</label>
                      <div className="bg-cream rounded px-3 py-2 text-xs font-bold text-primary border border-light-gray h-9 flex items-center">
                        ${totalCost}
                      </div>
                    </div>
                  </div>

                  {/* Children Attending Checkboxes */}
                  <div className="py-2 border-t border-b border-cream">
                    <span className="text-[10px] font-semibold text-dark-gray block mb-2">Children Attending:</span>
                    <div className="flex flex-wrap gap-4">
                      {[1, 2, 3, 4].map((childIdx) => (
                        <label key={childIdx} className="flex items-center gap-1.5 text-xs text-charcoal cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!getValue(`ft_planned_kid_${tripIdx}_c${childIdx}`, false)}
                            onChange={(e) => updateField(`ft_planned_kid_${tripIdx}_c${childIdx}`, e.target.checked)}
                            className="w-4 h-4 accent-primary"
                          />
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-semibold"
                            style={{
                              backgroundColor: childColors[childIdx].bg,
                              color: childColors[childIdx].hex,
                            }}
                          >
                            {getChildName(childIdx)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-semibold text-dark-gray block mb-1">Learning Focus & Objectives</label>
                      <input
                        type="text"
                        value={getValue(`${baseKey}_focus`)}
                        onChange={(e) => updateField(`${baseKey}_focus`, e.target.value)}
                        placeholder="What academic standard or interest is this tied to?"
                        className="w-full border border-light-gray rounded px-3 py-1.5 text-xs outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold text-dark-gray block mb-2">Permission Slip / Booking Status:</span>
                      <div className="flex gap-4 items-center h-8">
                        <label className="flex items-center gap-2 text-xs cursor-pointer">
                          <input
                            type="radio"
                            name={`ft_status_${tripIdx}`}
                            checked={getValue(`ft_status_${tripIdx}`) === 'filed'}
                            onChange={() => updateField(`ft_status_${tripIdx}`, 'filed')}
                            className="w-4 h-4 accent-teal"
                          />
                          <span>Filed / Booked</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs cursor-pointer">
                          <input
                            type="radio"
                            name={`ft_status_${tripIdx}`}
                            checked={getValue(`ft_status_${tripIdx}`) === 'pending'}
                            onChange={() => updateField(`ft_status_${tripIdx}`, 'pending')}
                            className="w-4 h-4 accent-gold"
                          />
                          <span>Pending</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-dark-gray block mb-1">Notes & Reminders</label>
                    <input
                      type="text"
                      value={getValue(`${baseKey}_notes`)}
                      onChange={(e) => updateField(`${baseKey}_notes`, e.target.value)}
                      placeholder="Packing list, lunch plans, driving instructions..."
                      className="w-full border border-light-gray rounded px-3 py-1.5 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Field Trip Log */}
        <div>
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6 pb-2 border-b border-light-gray">
            📝 Completed Field Trip Log
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {COMPLETED_LOGS.map((logIdx) => {
              const baseKey = `ft_log_${logIdx}`;

              return (
                <div key={logIdx} className="bg-white rounded-2xl p-6 border border-light-gray shadow-sm space-y-4">
                  <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                    Completed Trip Log {logIdx + 1}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-3">
                      <label className="text-[10px] font-semibold text-dark-gray block mb-1">Trip Name</label>
                      <input
                        type="text"
                        value={getValue(`${baseKey}_name`)}
                        onChange={(e) => updateField(`${baseKey}_name`, e.target.value)}
                        placeholder="Trip title"
                        className="w-full border border-light-gray rounded px-3 py-1.5 text-xs outline-none focus:border-primary font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-dark-gray block mb-1">Date Completed</label>
                      <input
                        type="date"
                        value={getValue(`${baseKey}_date`)}
                        onChange={(e) => updateField(`${baseKey}_date`, e.target.value)}
                        className="w-full border border-light-gray rounded px-3 py-1.5 text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-dark-gray block mb-1">Attendees</label>
                    <input
                      type="text"
                      value={getValue(`${baseKey}_kids`)}
                      onChange={(e) => updateField(`${baseKey}_kids`, e.target.value)}
                      placeholder="Who went on this trip? (e.g. C1, C2, etc.)"
                      className="w-full border border-light-gray rounded px-3 py-1.5 text-xs outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-dark-gray block mb-1">Highlights & Learning Outcomes</label>
                    <textarea
                      value={getValue(`${baseKey}_outcomes`)}
                      onChange={(e) => updateField(`${baseKey}_outcomes`, e.target.value)}
                      placeholder="What was observed? What did they learn? Any special moments?"
                      rows={3}
                      className="w-full border border-light-gray rounded p-3 text-xs outline-none focus:border-primary resize-none"
                    />
                  </div>

                  {/* Student Reflections */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-bold text-dark-gray block border-b border-cream pb-1">
                      Student Reflections
                    </span>
                    {[1, 2, 3, 4].map((childIdx) => {
                      const name = getChildName(childIdx);
                      const color = childColors[childIdx];
                      return (
                        <div key={childIdx} className="flex gap-3 items-center">
                          <label className="text-xs font-semibold text-charcoal w-24 flex items-center gap-1.5">
                            <input
                              type="checkbox"
                              checked={!!getValue(`${baseKey}_c${childIdx}_att`, false)}
                              onChange={(e) => updateField(`${baseKey}_c${childIdx}_att`, e.target.checked)}
                              className="w-3.5 h-3.5 accent-primary"
                            />
                            <span
                              className="px-1.5 py-0.5 rounded text-[9px] font-bold truncate max-w-[80px]"
                              style={{
                                backgroundColor: color.bg,
                                color: color.hex,
                              }}
                              title={name}
                            >
                              {name}
                            </span>
                          </label>
                          <input
                            type="text"
                            value={getValue(`${baseKey}_c${childIdx}_reflection`)}
                            onChange={(e) => updateField(`${baseKey}_c${childIdx}_reflection`, e.target.value)}
                            placeholder={`${name}'s reflection / what they liked best`}
                            className="flex-1 border border-light-gray rounded px-2.5 py-1 text-xs outline-none focus:border-primary"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
