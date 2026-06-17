import { useMemo } from 'react';
import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { INLINE_INPUT_CLASS } from '../Forms/formStyles';
import { Card } from '../UI/Card';

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
    <PageWrapper 
      title="Financial Tracker" 
      description="Track annual curriculum, supplies, and enrichment expenses."
    >
      {/* Top Level Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="flex flex-col justify-center items-center py-8">
          <span className="text-[10px] font-bold text-medium-gray uppercase tracking-wider mb-2">Annual Budget Target</span>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-dark-gray">$</span>
            <input
              type="number"
              value={getValue('exp_budget_target')}
              onChange={(e) => updateField('exp_budget_target', e.target.value)}
              placeholder="0.00"
              className="text-center font-bold font-mono text-3xl text-charcoal max-w-[140px] outline-none border-b border-transparent hover:border-light-gray focus:border-charcoal bg-transparent transition-colors"
            />
          </div>
        </Card>

        <Card className="flex flex-col justify-center items-center py-8 bg-charcoal text-white">
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-2">Actual Spent</span>
          <span className="font-bold font-mono text-4xl text-white block">
            ${totalSpent.toFixed(2)}
          </span>
        </Card>

        <Card className={`flex flex-col justify-center items-center py-8 ${
          variance >= 0
            ? 'bg-teal/10 border-teal/20 text-teal'
            : 'bg-coral/10 border-coral/20 text-coral'
        }`}>
          <span className="text-[10px] font-bold uppercase tracking-wider mb-2 opacity-80">Remaining Variance</span>
          <span className="font-bold font-mono text-4xl block">
            {variance >= 0 ? `$${variance.toFixed(2)}` : `-$${Math.abs(variance).toFixed(2)}`}
          </span>
        </Card>
      </div>

      <div className="space-y-8">
        {CATEGORIES.map((cat) => (
          <Card key={cat.key} noPadding className="overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-cream/40 border-b border-light-gray/60">
              <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">
                {cat.label}
              </h3>
              <div className="bg-white rounded-lg px-4 py-2 border border-light-gray/60 flex items-center gap-3 shadow-sm">
                <span className="text-[10px] font-bold text-medium-gray uppercase tracking-wider">Subtotal:</span>
                <span className="text-teal font-mono font-bold text-sm">${subtotals[cat.key].toFixed(2)}</span>
              </div>
            </div>

            <div className="overflow-x-auto p-5 bg-white">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-cream/30">
                  <tr>
                    <th className="py-2.5 px-3 text-[10px] font-semibold text-medium-gray uppercase tracking-wider border-b border-light-gray/60">Description</th>
                    <th className="py-2.5 px-3 text-[10px] font-semibold text-medium-gray uppercase tracking-wider border-b border-light-gray/60 w-32">Date</th>
                    <th className="py-2.5 px-3 text-[10px] font-semibold text-medium-gray uppercase tracking-wider border-b border-light-gray/60 w-32">Cost</th>
                    <th className="py-2.5 px-3 text-[10px] font-semibold text-medium-gray uppercase tracking-wider border-b border-light-gray/60 w-40">Assigned To</th>
                    <th className="py-2.5 px-3 text-[10px] font-semibold text-medium-gray uppercase tracking-wider border-b border-light-gray/60">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-gray/40">
                  {ROWS.map((rowIdx) => {
                    const baseKey = `exp_${cat.key}_r${rowIdx}`;
                    return (
                      <tr key={rowIdx} className="hover:bg-cream/30 transition-colors">
                        <td className="py-1.5 px-2">
                          <input
                            type="text"
                            value={getValue(`${baseKey}_item`)}
                            onChange={(e) => updateField(`${baseKey}_item`, e.target.value)}
                            placeholder="Item name"
                            className={`${INLINE_INPUT_CLASS} font-medium`}
                          />
                        </td>
                        <td className="py-1.5 px-2">
                          <input
                            type="date"
                            value={getValue(`${baseKey}_date`)}
                            onChange={(e) => updateField(`${baseKey}_date`, e.target.value)}
                            className={INLINE_INPUT_CLASS}
                          />
                        </td>
                        <td className="py-1.5 px-2">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-medium-gray">$</span>
                            <input
                              type="number"
                              value={getValue(`exp_${cat.key}_cost_${rowIdx}`)}
                              onChange={(e) => updateField(`exp_${cat.key}_cost_${rowIdx}`, e.target.value)}
                              placeholder="0.00"
                              className={`${INLINE_INPUT_CLASS} font-mono`}
                            />
                          </div>
                        </td>
                        <td className="py-1.5 px-2">
                          <select
                            value={getValue(`${baseKey}_child`)}
                            onChange={(e) => updateField(`${baseKey}_child`, e.target.value)}
                            className={`${INLINE_INPUT_CLASS} font-medium text-dark-gray text-xs h-8 p-0 cursor-pointer appearance-none bg-transparent`}
                          >
                            <option value="">— Family —</option>
                            <option value="1">{getChildName(1) || 'Student 1'}</option>
                            <option value="2">{getChildName(2) || 'Student 2'}</option>
                            <option value="3">{getChildName(3) || 'Student 3'}</option>
                            <option value="4">{getChildName(4) || 'Student 4'}</option>
                          </select>
                        </td>
                        <td className="py-1.5 px-2">
                          <input
                            type="text"
                            value={getValue(`${baseKey}_notes`)}
                            onChange={(e) => updateField(`${baseKey}_notes`, e.target.value)}
                            placeholder="Store, link, or receipt ref..."
                            className={INLINE_INPUT_CLASS}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        ))}

        {/* Annual Summary Bottom Card */}
        <Card className="bg-cream/40 mt-12">
          <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-6 pb-2 border-b border-light-gray/60">
            📊 Summary Breakdown
          </h3>
          <div className="space-y-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.key} className="flex justify-between items-center py-2 border-b border-light-gray/30 last:border-0">
                <span className="text-[11px] font-bold text-medium-gray uppercase tracking-wider">{cat.label}</span>
                <span className="font-mono font-bold text-charcoal">${subtotals[cat.key].toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 border-t border-light-gray/60">
              <span className="text-sm font-black text-primary uppercase tracking-wider">Total Investment</span>
              <span className="font-mono font-black text-lg text-primary">${totalSpent.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
