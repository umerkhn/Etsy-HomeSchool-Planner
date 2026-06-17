import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import ChecklistItem from '../Forms/ChecklistItem';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';

const SUBJECTS = [
  { key: 'math', label: 'Math' },
  { key: 'english', label: 'English/Language Arts' },
  { key: 'science', label: 'Science' },
  { key: 'history', label: 'History/Social Studies' },
  { key: 'elective1', label: 'Elective 1' },
  { key: 'elective2', label: 'Elective 2' },
];

function ChildSubjectSection({ childIndex }) {
  const { getChildName, getChildAge, getValue, updateField } = usePlanner();
  const color = childColors[childIndex];
  const name = getChildName(childIndex) || `Student ${childIndex}`;
  const age = getChildAge(childIndex);

  return (
    <Card className="border-l-4 overflow-visible relative" style={{ borderLeftColor: color.hex }}>
      <div className="flex items-center gap-3 mb-6 border-b border-light-gray/40 pb-4">
        <div
          className="w-8 h-8 rounded border border-light-gray shadow-sm flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: color.bg, color: color.hex }}
        >
          {childIndex}
        </div>
        <div>
          <h3 className="font-bold text-charcoal text-base">
            {name}
          </h3>
          <p className="text-xs text-medium-gray mt-0.5">
            {age ? `Age: ${age}` : 'Profile Setup Pending'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-medium-gray uppercase tracking-wider mb-2">Core Subjects</h4>
        
        <div className="space-y-3">
          {SUBJECTS.map((sub) => (
            <div key={sub.key} className="flex flex-col sm:flex-row sm:items-center gap-3 p-2 hover:bg-cream/40 rounded-lg transition-colors">
              <div className="sm:w-48">
                <ChecklistItem
                  field={`sb_c${childIndex}_${sub.key}_checked`}
                  label={sub.label}
                  className="w-auto"
                />
              </div>
              <div className="flex-1 flex gap-3">
                <div className="flex-1 min-w-[120px]">
                  <input
                    type="text"
                    value={getValue(`sb_c${childIndex}_${sub.key}_curriculum`)}
                    onChange={(e) => updateField(`sb_c${childIndex}_${sub.key}_curriculum`, e.target.value)}
                    placeholder="Curriculum Resource"
                    className="w-full border-b border-transparent hover:border-light-gray focus:border-dark-gray px-1 py-1 text-sm outline-none bg-transparent transition-all placeholder:text-light-gray"
                  />
                </div>
                <div className="w-24 border-l border-light-gray/40 pl-3">
                  <input
                    type="text"
                    value={getValue(`sb_c${childIndex}_${sub.key}_level`)}
                    onChange={(e) => updateField(`sb_c${childIndex}_${sub.key}_level`, e.target.value)}
                    placeholder="Level"
                    className="w-full border-b border-transparent hover:border-light-gray focus:border-dark-gray px-1 py-1 text-sm outline-none bg-transparent transition-all placeholder:text-light-gray text-center"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-4 border-t border-light-gray/40">
          <TextInput
            field={`sb_c${childIndex}_hoursPerWeek`}
            label="Target Hours per Week"
            placeholder="e.g. 20"
          />
          <div className="sm:col-span-2">
            <TextInput
              field={`sb_c${childIndex}_books`}
              label="Key Books & Materials"
              placeholder="List primary texts or supplies..."
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function SubjectBreakdownPage() {
  return (
    <PageWrapper 
      title="Subject Breakdown"
      description="Define the core subjects, curriculum choices, and levels for each student."
    >
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <ChildSubjectSection key={i} childIndex={i} />
        ))}
      </div>
    </PageWrapper>
  );
}
