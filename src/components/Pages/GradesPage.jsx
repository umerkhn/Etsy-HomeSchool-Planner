import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { Card } from '../UI/Card';
import { INLINE_INPUT_CLASS, SELECT_CLASS } from '../Forms/formStyles';

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
    <PageWrapper 
      title="Academic Progress Tracker" 
      description="Record term grades, progress markers, and final outcomes."
    >
      <div className="space-y-8">
        {[1, 2, 3, 4].map((childIdx) => {
          const name = getChildName(childIdx) || `Student ${childIdx}`;
          const age = getChildAge(childIdx);
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
                <div>
                  <h3 className="font-bold text-charcoal text-base">{name}</h3>
                  <p className="text-[10px] text-medium-gray uppercase tracking-wider mt-0.5">
                    {age ? `Age: ${age}` : 'Student Profile'}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-cream/50 border-b border-light-gray/60">
                    <tr>
                      <th className="py-2.5 px-4 text-[10px] font-semibold text-medium-gray uppercase tracking-wider w-48">Subject</th>
                      <th className="py-2.5 px-2 text-[10px] font-semibold text-medium-gray uppercase tracking-wider text-center w-14">Q1</th>
                      <th className="py-2.5 px-2 text-[10px] font-semibold text-medium-gray uppercase tracking-wider text-center w-14">Q2</th>
                      <th className="py-2.5 px-2 text-[10px] font-semibold text-medium-gray uppercase tracking-wider text-center w-14">Q3</th>
                      <th className="py-2.5 px-2 text-[10px] font-semibold text-medium-gray uppercase tracking-wider text-center w-14 border-r border-light-gray/60">Q4</th>
                      <th className="py-2.5 px-3 text-[10px] font-bold text-charcoal uppercase tracking-wider text-center w-16 bg-cream">Final</th>
                      <th className="py-2.5 px-4 text-[10px] font-semibold text-medium-gray uppercase tracking-wider">Notes / Highlights</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light-gray/40">
                    {SUBJECTS.map((subject) => {
                      const subjectKey = subject.toLowerCase().replace(/[^a-z0-9]/g, '');
                      return (
                        <tr key={subject} className="hover:bg-cream/30 transition-colors">
                          <td className="py-2 px-4 text-xs font-medium text-dark-gray">{subject}</td>
                          {['q1', 'q2', 'q3', 'q4'].map((term) => (
                            <td key={term} className={`py-2 px-1 text-center ${term === 'q4' ? 'border-r border-light-gray/60' : ''}`}>
                              <select
                                value={getValue(`grade_c${childIdx}_${subjectKey}_${term}`)}
                                onChange={(e) => updateField(`grade_c${childIdx}_${subjectKey}_${term}`, e.target.value)}
                                className={`${INLINE_INPUT_CLASS} font-bold text-center appearance-none cursor-pointer p-0 text-charcoal h-6`}
                              >
                                {GRADE_OPTIONS.map((g) => (
                                  <option key={g} value={g}>{g || '—'}</option>
                                ))}
                              </select>
                            </td>
                          ))}
                          <td className="py-2 px-1 text-center bg-cream/30">
                            <select
                              value={getValue(`grade_c${childIdx}_${subjectKey}_final`)}
                              onChange={(e) => updateField(`grade_c${childIdx}_${subjectKey}_final`, e.target.value)}
                              className={`${INLINE_INPUT_CLASS} font-black text-center appearance-none cursor-pointer p-0 text-charcoal h-6 bg-transparent`}
                            >
                              {GRADE_OPTIONS.map((g) => (
                                <option key={g} value={g}>{g || '—'}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={getValue(`grade_notes_c${childIdx}_${subjectKey}`)}
                              onChange={(e) => updateField(`grade_notes_c${childIdx}_${subjectKey}`, e.target.value)}
                              placeholder="..."
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
          );
        })}

        {/* Grading Scale Legend */}
        <Card className="bg-charcoal text-white mt-12">
          <h4 className="text-[11px] font-bold text-white/70 uppercase tracking-wider mb-6 border-b border-white/10 pb-3">Grading System & Keys</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-white/80">
            <div>
              <span className="font-bold text-white block mb-2">Standard Letter Grades</span>
              <ul className="space-y-1 font-mono text-[11px]">
                <li><span className="text-teal w-4 inline-block">A</span> Excellent (90–100%)</li>
                <li><span className="text-sage w-4 inline-block">B</span> Above Average (80–89%)</li>
                <li><span className="text-gold w-4 inline-block">C</span> Average (70–79%)</li>
                <li><span className="text-coral w-4 inline-block">D</span> Below Average (60–69%)</li>
                <li><span className="text-coral w-4 inline-block">F</span> Failing (&lt;60%)</li>
              </ul>
            </div>
            <div>
              <span className="font-bold text-white block mb-2">Alternate Grades</span>
              <ul className="space-y-1 font-mono text-[11px]">
                <li><span className="text-white w-4 inline-block font-bold">E</span> Excellent progress</li>
                <li><span className="text-white w-4 inline-block font-bold">S</span> Satisfactory progress</li>
                <li><span className="text-white w-4 inline-block font-bold">N</span> Needs improvement</li>
                <li><span className="text-white w-4 inline-block font-bold">I</span> Incomplete</li>
              </ul>
            </div>
            <div>
              <span className="font-bold text-white block mb-2">Outcome Grades</span>
              <ul className="space-y-1 font-mono text-[11px]">
                <li><span className="text-white inline-block w-10 font-bold">Pass</span> Satisfactorily completed</li>
                <li><span className="text-white inline-block w-10 font-bold">Fail</span> Not completed</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
