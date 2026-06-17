import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { Card } from '../UI/Card';
import { INLINE_INPUT_CLASS } from '../Forms/formStyles';

const SUBJECT_ROWS = [
  'Math', 'Math', 'Math', 'Math',
  'English', 'English', 'English', 'English',
  'Science', 'Science', 'Science', 'Science',
  'History', 'History', 'History', 'History',
  'Elective', 'Elective', 'Elective', 'Elective',
];

export default function CurriculumTrackingPage() {
  const { getValue, updateField } = usePlanner();

  const getTotal = () => {
    let sum = 0;
    for (let i = 0; i < 20; i++) {
      const val = parseFloat(getValue(`ct_cost_${i}`, '0')) || 0;
      sum += val;
    }
    return sum.toFixed(2);
  };

  return (
    <PageWrapper 
      title="Curriculum & Materials" 
      description="Track resources, publishers, and your total investment."
    >
      <Card noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-cream/50 border-b border-light-gray/60">
              <tr>
                <th className="py-2.5 px-4 text-[11px] font-semibold text-medium-gray uppercase tracking-wider w-24">Subject</th>
                <th className="py-2.5 px-3 text-[11px] font-semibold text-medium-gray uppercase tracking-wider w-20">Child</th>
                <th className="py-2.5 px-3 text-[11px] font-semibold text-medium-gray uppercase tracking-wider">Curriculum Name</th>
                <th className="py-2.5 px-3 text-[11px] font-semibold text-medium-gray uppercase tracking-wider">Publisher</th>
                <th className="py-2.5 px-3 text-[11px] font-semibold text-medium-gray uppercase tracking-wider w-28">Cost ($)</th>
                <th className="py-2.5 px-4 text-[11px] font-semibold text-medium-gray uppercase tracking-wider text-center w-12">Done</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray/40">
              {SUBJECT_ROWS.map((subject, i) => (
                <tr key={i} className="hover:bg-cream/30 transition-colors group">
                  <td className="py-1.5 px-4 text-xs font-medium text-dark-gray">{subject}</td>
                  <td className="py-1.5 px-2">
                    <select
                      value={getValue(`ct_child_${i}`)}
                      onChange={(e) => updateField(`ct_child_${i}`, e.target.value)}
                      className={`${INLINE_INPUT_CLASS} font-medium text-dark-gray text-center cursor-pointer`}
                    >
                      <option value="">—</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </td>
                  <td className="py-1.5 px-2">
                    <input
                      type="text"
                      value={getValue(`ct_curriculum_${i}`)}
                      onChange={(e) => updateField(`ct_curriculum_${i}`, e.target.value)}
                      placeholder="Title or Resource"
                      className={INLINE_INPUT_CLASS}
                    />
                  </td>
                  <td className="py-1.5 px-2">
                    <input
                      type="text"
                      value={getValue(`ct_publisher_${i}`)}
                      onChange={(e) => updateField(`ct_publisher_${i}`, e.target.value)}
                      placeholder="Company"
                      className={INLINE_INPUT_CLASS}
                    />
                  </td>
                  <td className="py-1.5 px-2">
                    <input
                      type="number"
                      value={getValue(`ct_cost_${i}`)}
                      onChange={(e) => updateField(`ct_cost_${i}`, e.target.value)}
                      placeholder="0.00"
                      className={`${INLINE_INPUT_CLASS} font-mono`}
                    />
                  </td>
                  <td className="py-1.5 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={!!getValue(`ct_check_${i}`, false)}
                      onChange={(e) => updateField(`ct_check_${i}`, e.target.checked)}
                      className="w-4 h-4 rounded border-light-gray text-charcoal focus:ring-charcoal/20 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer Total */}
        <div className="bg-cream/30 p-4 border-t border-light-gray/60 flex justify-end items-center gap-4">
          <span className="text-[11px] font-semibold text-medium-gray uppercase tracking-wider">Total Investment</span>
          <span className="text-lg font-bold text-charcoal font-mono">${getTotal()}</span>
        </div>
      </Card>
    </PageWrapper>
  );
}
