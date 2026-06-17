import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';

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
    <PageWrapper title="Curriculum & Materials Inventory" pageNum={7}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-primary/20">
              <th className="text-left py-2 px-2 text-xs font-semibold text-dark-gray w-20">Subject</th>
              <th className="text-left py-2 px-2 text-xs font-semibold text-dark-gray w-16">Child</th>
              <th className="text-left py-2 px-2 text-xs font-semibold text-dark-gray">Curriculum</th>
              <th className="text-left py-2 px-2 text-xs font-semibold text-dark-gray">Publisher</th>
              <th className="text-left py-2 px-2 text-xs font-semibold text-dark-gray w-20">Cost</th>
              <th className="text-center py-2 px-2 text-xs font-semibold text-dark-gray w-10">✓</th>
            </tr>
          </thead>
          <tbody>
            {SUBJECT_ROWS.map((subject, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-cream/50' : 'bg-white'}>
                <td className="py-1 px-2 text-xs font-medium text-charcoal">{subject}</td>
                <td className="py-1 px-2">
                  <select
                    value={getValue(`ct_child_${i}`)}
                    onChange={(e) => updateField(`ct_child_${i}`, e.target.value)}
                    className="w-full border border-light-gray rounded px-1 py-1 text-xs focus:border-primary outline-none bg-white"
                  >
                    <option value="">—</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="C3">C3</option>
                    <option value="C4">C4</option>
                  </select>
                </td>
                <td className="py-1 px-2">
                  <input
                    type="text"
                    value={getValue(`ct_curriculum_${i}`)}
                    onChange={(e) => updateField(`ct_curriculum_${i}`, e.target.value)}
                    placeholder="Curriculum name"
                    className="w-full border border-light-gray rounded px-2 py-1 text-xs focus:border-primary outline-none"
                  />
                </td>
                <td className="py-1 px-2">
                  <input
                    type="text"
                    value={getValue(`ct_publisher_${i}`)}
                    onChange={(e) => updateField(`ct_publisher_${i}`, e.target.value)}
                    placeholder="Publisher"
                    className="w-full border border-light-gray rounded px-2 py-1 text-xs focus:border-primary outline-none"
                  />
                </td>
                <td className="py-1 px-2">
                  <div className="flex items-center">
                    <span className="text-xs text-medium-gray mr-1">$</span>
                    <input
                      type="number"
                      value={getValue(`ct_cost_${i}`)}
                      onChange={(e) => updateField(`ct_cost_${i}`, e.target.value)}
                      placeholder="0.00"
                      className="w-full border border-light-gray rounded px-2 py-1 text-xs focus:border-primary outline-none"
                    />
                  </div>
                </td>
                <td className="py-1 px-2 text-center">
                  <input
                    type="checkbox"
                    checked={!!getValue(`ct_check_${i}`, false)}
                    onChange={(e) => updateField(`ct_check_${i}`, e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="mt-4 flex justify-end">
        <div className="bg-primary/10 rounded-xl px-6 py-3">
          <span className="text-sm font-semibold text-primary">
            Total Curriculum Investment: ${getTotal()}
          </span>
        </div>
      </div>
    </PageWrapper>
  );
}
