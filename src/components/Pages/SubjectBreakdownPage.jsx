import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import ChecklistItem from '../Forms/ChecklistItem';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';

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
  const name = getChildName(childIndex);
  const age = getChildAge(childIndex);

  return (
    <div
      className="rounded-xl p-5 border-l-4"
      style={{ borderColor: color.hex, backgroundColor: color.bg }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
          style={{ backgroundColor: color.hex }}
        >
          {childIndex}
        </div>
        <div>
          <h3 className="font-semibold text-charcoal">
            {name} {age && <span className="text-medium-gray font-normal">(Age: {age})</span>}
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-dark-gray uppercase tracking-wider">Core Subjects</h4>
        {SUBJECTS.map((sub) => (
          <div key={sub.key} className="flex flex-wrap items-center gap-2">
            <ChecklistItem
              field={`sb_c${childIndex}_${sub.key}_checked`}
              label={`${sub.label}:`}
              className="w-auto"
            />
            <div className="flex-1 min-w-[120px]">
              <input
                type="text"
                value={getValue(`sb_c${childIndex}_${sub.key}_curriculum`)}
                onChange={(e) => updateField(`sb_c${childIndex}_${sub.key}_curriculum`, e.target.value)}
                placeholder="Curriculum"
                className="w-full border border-light-gray rounded px-2 py-1 text-xs focus:border-primary outline-none bg-white"
              />
            </div>
            <div className="w-28">
              <input
                type="text"
                value={getValue(`sb_c${childIndex}_${sub.key}_level`)}
                onChange={(e) => updateField(`sb_c${childIndex}_${sub.key}_level`, e.target.value)}
                placeholder="Grade/Level"
                className="w-full border border-light-gray rounded px-2 py-1 text-xs focus:border-primary outline-none bg-white"
              />
            </div>
          </div>
        ))}

        <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-white/50">
          <TextInput
            field={`sb_c${childIndex}_hoursPerWeek`}
            label="Hours per Week"
            placeholder="e.g., 25"
            className="w-32"
          />
          <TextInput
            field={`sb_c${childIndex}_books`}
            label="Books/Curriculum"
            placeholder="Primary resources"
            className="flex-1 min-w-[200px]"
          />
        </div>
      </div>
    </div>
  );
}

export default function SubjectBreakdownPage() {
  return (
    <PageWrapper title="Subject Breakdown by Child" pageNum={6}>
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <ChildSubjectSection key={i} childIndex={i} />
        ))}
      </div>
    </PageWrapper>
  );
}
