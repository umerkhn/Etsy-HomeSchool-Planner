import { useMemo } from 'react';
import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { INLINE_INPUT_CLASS } from '../Forms/formStyles';

// Hoisted to module scope
const CATEGORIES = [
  { key: 'curriculum', label: 'Curriculum' },
  { key: 'supplies', label: 'Supplies & Materials' },
  { key: 'extra', label: 'Extracurriculars' },
  { key: 'field_trips', label: 'Field Trips & Outings' },
  { key: 'other', label: 'Other Expenses' },
];
const ROWS = Array.from({ length: 5 }, (_, i) => i);

export default function ExpensesPage() {
  const { getValue, updateField, getChildName } = usePlanner();

  // Memoized financial calculations
  const { subtotals, totalSpent } = useMemo(() => {
    const subs = {};
    let total = 0;
    CATEGORIES.forEach((cat) => {
      let sum = 0;
      ROWS.forEach((rowIdx) => {
        const cost = parseFloat(getValue(`exp_${cat.key}_cost_${rowIdx}`, '0')) || 0;
        sum += cost;
      });
      subs[cat.key] = sum;
      total += sum;
    });
    return { subtotals: subs, totalSpent: total };
  }, [getValue]);

  const budgetTarget = parseFloat(getValue('exp_budget_target', '0')) || 0;
  const variance = budgetTarget - totalSpent;

  return (
    <PageWrapper title="Homeschool Expenses Tracker 2025–2026" pageNum={63}>
      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-2xl p-5 border border-light-gray shadow-sm text-center">
          <span className="text-medium-gray block text-[10px] uppercase font-bold tracking-wider">Annual Budget Target</span>
          <div className="flex justify-center items-center gap-1.5 mt-1">
            <span className="text-sm font-bold text-dark-gray">$</span>
            <input
              type="number"
              value={getValue('exp_budget_target')}
              onChange={(e) => updateField('exp_budget_target', e.target.value)}
              placeholder="0.00"
              className="text-center font-bold text-xl text-charcoal max-w-[120px] outline-none border-b border-light-gray focus:border-primary px-1"
            />
          </div>
        </div>

        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/20 shadow-sm text-center">
          <span className="text-primary block text-[10px] uppercase font-bold tracking-wider">Actual Spent</span>
          <span className="text-primary font-bold text-2xl mt-1 block">${totalSpent.toFixed(2)}</span>
        </div>

        <div className={`rounded-2xl p-5 border shadow-sm text-center ${
          variance >= 0
            ? 'bg-teal/5 border-teal/20 text-teal'
            : 'bg-coral/5 border-coral/20 text-coral'
        }`}>
          <span className="block text-[10px] uppercase font-bold tracking-wider opacity-80">Remaining Variance</span>
          <span className="font-bold text-2xl mt-1 block">
            {variance >= 0 ? `$${variance.toFixed(2)}` : `-$${Math.abs(variance).toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="space-y-10">
        {CATEGORIES.map((cat) => (
          <div key={cat.key} className="bg-white rounded-2xl p-6 border border-light-gray shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b border-cream pb-2">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
                Category: {cat.label}
              </h3>
              <span className="text-xs font-semibold text-charcoal">
                Subtotal: <span className="text-teal">${subtotals[cat.key].toFixed(2)}</span>
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-cream">
                    <th className="py-2 px-2 text-xs font-semibold text-dark-gray">Item / Description</th>
                    <th className="py-2 px-2 text-xs font-semibold text-dark-gray w-28">Date</th>
                    <th className="py-2 px-2 text-xs font-semibold text-dark-gray w-24">Cost</th>
                    <th className="py-2 px-2 text-xs font-semibold text-dark-gray w-36">Child</th>
                    <th className="py-2 px-2 text-xs font-semibold text-dark-gray">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((rowIdx) => {
                    const baseKey = `exp_${cat.key}_r${rowIdx}`;
                    return (
                      <tr key={rowIdx} className="border-b border-cream/50 hover:bg-cream/10">
                        <td className="py-1 px-1">
                          <input
                            type="text"
                            value={getValue(`${baseKey}_item`)}
                            onChange={(e) => updateField(`${baseKey}_item`, e.target.value)}
                            placeholder="Item name"
                            className={INLINE_INPUT_CLASS}
                          />
                        </td>
                        <td className="py-1 px-1">
                          <input
                            type="date"
                            value={getValue(`${baseKey}_date`)}
                            onChange={(e) => updateField(`${baseKey}_date`, e.target.value)}
                            className={INLINE_INPUT_CLASS}
                          />
                        </td>
                        <td className="py-1 px-1">
                          <div className="flex items-center">
                            <span className="text-xs text-medium-gray mr-1">$</span>
                            <input
                              type="number"
                              value={getValue(`exp_${cat.key}_cost_${rowIdx}`)}
                              onChange={(e) => updateField(`exp_${cat.key}_cost_${rowIdx}`, e.target.value)}
                              placeholder="0.00"
                              className={INLINE_INPUT_CLASS}
                            />
                          </div>
                        </td>
                        <td className="py-1 px-1">
                          <select
                            value={getValue(`${baseKey}_child`)}
                            onChange={(e) => updateField(`${baseKey}_child`, e.target.value)}
                            className={`${INLINE_INPUT_CLASS} font-medium text-dark-gray`}
                          >
                            <option value="">— Family —</option>
                            <option value="1">{getChildName(1)}</option>
                            <option value="2">{getChildName(2)}</option>
                            <option value="3">{getChildName(3)}</option>
                            <option value="4">{getChildName(4)}</option>
                          </select>
                        </td>
                        <td className="py-1 px-1">
                          <input
                            type="text"
                            value={getValue(`${baseKey}_notes`)}
                            onChange={(e) => updateField(`${baseKey}_notes`, e.target.value)}
                            placeholder="Store, link, invoice ref..."
                            className={INLINE_INPUT_CLASS}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Annual Investment Summary Table */}
        <div className="bg-cream rounded-2xl p-6 border border-light-gray">
          <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4 pb-1 border-b border-light-gray">
            📊 Annual Financial Summary
          </h3>
          <div className="space-y-2 text-xs">
            {CATEGORIES.map((cat) => (
              <div key={cat.key} className="flex justify-between items-center py-1 border-b border-cream">
                <span className="text-dark-gray font-medium">{cat.label}</span>
                <span className="font-semibold text-charcoal">${subtotals[cat.key].toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3 border-t border-light-gray font-bold text-sm text-primary">
              <span>TOTAL ANNUAL INVESTMENT</span>
              <span>${totalSpent.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
