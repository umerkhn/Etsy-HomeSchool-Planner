import { useParams } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import TextArea from '../Forms/TextArea';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { MONTHS } from '../../utils/pageRegistry';

export default function MonthlyOverviewPage() {
  const { month } = useParams();
  const { getChildName, getValue, updateField } = usePlanner();
  const m = MONTHS.find((x) => x.key === month) || MONTHS[0];
  const mIdx = MONTHS.indexOf(m);
  const pageNum = 18 + mIdx * 2;

  return (
    <PageWrapper title={`${m.label} Overview`} pageNum={pageNum}>
      <div className="space-y-8">
        {/* Monthly Theme */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-3">
            Monthly Theme/Focus
          </h3>
          <TextInput field={`mo_${month}_theme`} placeholder="e.g., New Beginnings | Building Routines" />
        </div>

        <hr className="border-light-gray" />

        {/* Goals */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Goals for This Month
          </h3>
          <div className="space-y-3">
            <TextArea field={`mo_${month}_familyGoal`} label="Family Goal" rows={2} />
            {[1, 2, 3, 4].map((i) => (
              <TextArea
                key={i}
                field={`mo_${month}_childGoal_${i}`}
                label={getChildName(i)}
                rows={2}
              />
            ))}
          </div>
        </div>

        <hr className="border-light-gray" />

        {/* Weekly Schedule */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Weekly Schedule
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((w) => (
              <div key={w} className="bg-cream rounded-xl p-4">
                <h4 className="text-xs font-bold text-primary mb-2">Week {w}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <TextInput field={`mo_${month}_w${w}_theme`} label="Theme/Unit" placeholder="Theme" />
                  <TextInput field={`mo_${month}_w${w}_focus`} label="Focus" placeholder="Focus area" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-light-gray" />

        {/* Curriculum Progress */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Curriculum Progress This Month
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-light-gray">
                  <th className="text-left py-2 px-2 text-xs font-semibold text-dark-gray">Child</th>
                  {['Math', 'ELA', 'Science', 'History'].map((s) => (
                    <th key={s} className="text-center py-2 px-2 text-xs font-semibold text-dark-gray">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-cream/50' : ''}>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: childColors[i].hex }} />
                        <span className="text-xs font-medium">{getChildName(i)}</span>
                      </div>
                    </td>
                    {['math', 'ela', 'science', 'history'].map((s) => (
                      <td key={s} className="py-1 px-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="checkbox"
                            checked={!!getValue(`mo_${month}_c${i}_${s}_check`, false)}
                            onChange={(e) => updateField(`mo_${month}_c${i}_${s}_check`, e.target.checked)}
                            className="w-3.5 h-3.5 accent-primary"
                          />
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={getValue(`mo_${month}_c${i}_${s}_pct`, '')}
                            onChange={(e) => updateField(`mo_${month}_c${i}_${s}_pct`, e.target.value)}
                            placeholder="0"
                            className="w-12 border border-light-gray rounded px-1 py-0.5 text-xs text-center focus:border-primary outline-none"
                          />
                          <span className="text-[10px] text-medium-gray">%</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <hr className="border-light-gray" />

        {/* Notes */}
        <TextArea field={`mo_${month}_notes`} label="Notes for This Month" rows={4} />
      </div>
    </PageWrapper>
  );
}
