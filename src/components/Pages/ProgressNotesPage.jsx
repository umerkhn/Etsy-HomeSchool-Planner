import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';

export default function ProgressNotesPage() {
  const { getValue, updateField, getChildName } = usePlanner();

  const SUBJECTS = [
    { key: 'math', label: 'Math' },
    { key: 'english', label: 'English / ELA' },
    { key: 'science', label: 'Science' },
    { key: 'history', label: 'History / Social Studies' },
  ];

  return (
    <PageWrapper title="Subject-by-Subject Progress Notes" pageNum={60}>
      <div className="space-y-12">
        {[1, 2, 3, 4].map((childIdx) => {
          const name = getChildName(childIdx);
          const color = childColors[childIdx];

          return (
            <div
              key={childIdx}
              className="bg-white rounded-2xl p-6 border-l-4 shadow-sm border-light-gray"
              style={{ borderLeftColor: color.hex }}
            >
              <div className="mb-6">
                <h3 className="text-lg font-bold text-charcoal">{name}</h3>
                <p className="text-xs text-medium-gray mt-0.5">
                  Reflect on strengths, areas of growth, and future learning trajectories
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SUBJECTS.map((subject) => {
                  const baseKey = `prog_notes_c${childIdx}_${subject.key}`;
                  return (
                    <div
                      key={subject.key}
                      className="border border-cream rounded-xl p-4 bg-cream/30"
                    >
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 pb-1 border-b border-light-gray">
                        {subject.label}
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                            Strengths & Wins
                          </label>
                          <textarea
                            value={getValue(`${baseKey}_strengths`, '')}
                            onChange={(e) => updateField(`${baseKey}_strengths`, e.target.value)}
                            placeholder="What went well? Concepts mastered, high interest..."
                            rows={2}
                            className="w-full border border-light-gray rounded-lg p-2 text-xs bg-white outline-none focus:border-primary resize-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                            Areas to Improve / Challenges
                          </label>
                          <textarea
                            value={getValue(`${baseKey}_improve`, '')}
                            onChange={(e) => updateField(`${baseKey}_improve`, e.target.value)}
                            placeholder="Trouble spots, concepts needing review..."
                            rows={2}
                            className="w-full border border-light-gray rounded-lg p-2 text-xs bg-white outline-none focus:border-primary resize-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                            Next Steps & Action Items
                          </label>
                          <textarea
                            value={getValue(`${baseKey}_next`, '')}
                            onChange={(e) => updateField(`${baseKey}_next`, e.target.value)}
                            placeholder="Adjustments, practice ideas, extra help..."
                            rows={2}
                            className="w-full border border-light-gray rounded-lg p-2 text-xs bg-white outline-none focus:border-primary resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
