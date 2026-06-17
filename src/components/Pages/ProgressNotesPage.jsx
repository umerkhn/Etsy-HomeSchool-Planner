import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { Card } from '../UI/Card';
import { INLINE_TEXTAREA_CLASS } from '../Forms/formStyles';

export default function ProgressNotesPage() {
  const { getValue, updateField, getChildName } = usePlanner();

  const SUBJECTS = [
    { key: 'math', label: 'Math' },
    { key: 'english', label: 'English / ELA' },
    { key: 'science', label: 'Science' },
    { key: 'history', label: 'History / Social Studies' },
  ];

  return (
    <PageWrapper 
      title="Progress Notes" 
      description="Reflect on strengths, areas of growth, and future learning trajectories per subject."
    >
      <div className="space-y-8">
        {[1, 2, 3, 4].map((childIdx) => {
          const name = getChildName(childIdx) || `Student ${childIdx}`;
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
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SUBJECTS.map((subject) => {
                  const baseKey = `prog_notes_c${childIdx}_${subject.key}`;
                  return (
                    <div
                      key={subject.key}
                      className="border border-light-gray/60 rounded-xl p-4 bg-cream/20 shadow-sm"
                    >
                      <h4 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-4 border-b border-light-gray/60 pb-2">
                        {subject.label}
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold text-teal uppercase tracking-wider block mb-1.5">
                            Strengths & Wins
                          </label>
                          <textarea
                            value={getValue(`${baseKey}_strengths`, '')}
                            onChange={(e) => updateField(`${baseKey}_strengths`, e.target.value)}
                            placeholder="Concepts mastered..."
                            rows={2}
                            className={`${INLINE_TEXTAREA_CLASS} bg-white shadow-sm border border-transparent hover:border-teal/30 focus:border-teal focus:ring-teal/20`}
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-coral uppercase tracking-wider block mb-1.5">
                            Areas to Improve
                          </label>
                          <textarea
                            value={getValue(`${baseKey}_improve`, '')}
                            onChange={(e) => updateField(`${baseKey}_improve`, e.target.value)}
                            placeholder="Trouble spots..."
                            rows={2}
                            className={`${INLINE_TEXTAREA_CLASS} bg-white shadow-sm border border-transparent hover:border-coral/30 focus:border-coral focus:ring-coral/20`}
                          />
                        </div>

                        <div className="pt-2 border-t border-light-gray/40">
                          <label className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1.5">
                            Action Items
                          </label>
                          <textarea
                            value={getValue(`${baseKey}_next`, '')}
                            onChange={(e) => updateField(`${baseKey}_next`, e.target.value)}
                            placeholder="Next steps..."
                            rows={2}
                            className={`${INLINE_TEXTAREA_CLASS} bg-white shadow-sm`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </PageWrapper>
  );
}
