import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';

export default function GradesPage() {
  const { getValue, updateField, getChildName, getChildAge } = usePlanner();

  const SUBJECTS = [
    'Math',
    'English / Language Arts',
    'Science',
    'History / Social Studies',
    'Elective 1',
    'Elective 2',
  ];

  const GRADE_OPTIONS = ['', 'A', 'B', 'C', 'D', 'F', 'Pass', 'Fail', 'E', 'S', 'N', 'I'];

  return (
    <PageWrapper title="Progress & Grades Tracker" pageNum={58}>
      <div className="space-y-12">
        {[1, 2, 3, 4].map((childIdx) => {
          const name = getChildName(childIdx);
          const age = getChildAge(childIdx);
          const color = childColors[childIdx];

          return (
            <div
              key={childIdx}
              className="bg-white rounded-2xl p-6 border-l-4 shadow-sm border-light-gray"
              style={{ borderLeftColor: color.hex }}
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-charcoal flex items-center gap-2">
                  <span>{name}</span>
                  {age && (
                    <span className="text-xs font-normal text-dark-gray bg-cream rounded-full px-2.5 py-0.5">
                      Age: {age}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-medium-gray mt-0.5">
                  Academic subject progress grades across terms
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-light-gray">
                      <th className="py-2.5 px-3 text-xs font-semibold text-dark-gray w-1/4">Subject</th>
                      <th className="py-2.5 px-2 text-xs font-semibold text-dark-gray text-center w-12">Q1</th>
                      <th className="py-2.5 px-2 text-xs font-semibold text-dark-gray text-center w-12">Q2</th>
                      <th className="py-2.5 px-2 text-xs font-semibold text-dark-gray text-center w-12">Q3</th>
                      <th className="py-2.5 px-2 text-xs font-semibold text-dark-gray text-center w-12">Q4</th>
                      <th className="py-2.5 px-2 text-xs font-semibold text-dark-gray text-center w-16">Final</th>
                      <th className="py-2.5 px-3 text-xs font-semibold text-dark-gray">Progress Notes & Highlights</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SUBJECTS.map((subject) => {
                      const subjectKey = subject.toLowerCase().replace(/[^a-z0-9]/g, '');
                      return (
                        <tr key={subject} className="border-b border-cream hover:bg-cream/35 transition-colors">
                          <td className="py-2 px-3 text-xs font-medium text-charcoal">{subject}</td>
                          {['q1', 'q2', 'q3', 'q4', 'final'].map((term) => (
                            <td key={term} className="py-1 px-1 text-center">
                              <select
                                value={getValue(`grade_c${childIdx}_${subjectKey}_${term}`)}
                                onChange={(e) => updateField(`grade_c${childIdx}_${subjectKey}_${term}`, e.target.value)}
                                className="w-full text-center border border-light-gray rounded px-1.5 py-1 text-xs outline-none bg-white focus:border-primary font-semibold"
                              >
                                {GRADE_OPTIONS.map((g) => (
                                  <option key={g} value={g}>
                                    {g || '—'}
                                  </option>
                                ))}
                              </select>
                            </td>
                          ))}
                          <td className="py-1 px-3">
                            <input
                              type="text"
                              value={getValue(`grade_notes_c${childIdx}_${subjectKey}`)}
                              onChange={(e) => updateField(`grade_notes_c${childIdx}_${subjectKey}`, e.target.value)}
                              placeholder="Notes or unit titles completed"
                              className="w-full border border-light-gray rounded px-2.5 py-1 text-xs outline-none focus:border-primary"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* Grading Scale Legend */}
        <div className="mt-8 pt-6 border-t border-light-gray bg-cream rounded-2xl p-5">
          <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3">Grading System & Keys</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-dark-gray">
            <div>
              <span className="font-bold text-charcoal block mb-1">Standard Letter Grades:</span>
              <span className="block">A — Excellent (90–100%)</span>
              <span className="block">B — Above Average (80–89%)</span>
              <span className="block">C — Average (70–79%)</span>
              <span className="block">D — Below Average (60–69%)</span>
              <span className="block">F — Failing (&lt;60%)</span>
            </div>
            <div>
              <span className="font-bold text-charcoal block mb-1">Alternate Grades:</span>
              <span className="block">E — Excellent progress</span>
              <span className="block">S — Satisfactory progress</span>
              <span className="block">N — Needs improvement</span>
              <span className="block">I — Incomplete</span>
            </div>
            <div>
              <span className="font-bold text-charcoal block mb-1">Outcome Grades:</span>
              <span className="block">Pass — Satisfactorily completed</span>
              <span className="block">Fail — Not completed</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
