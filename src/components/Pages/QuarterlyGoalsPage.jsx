import { useParams } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import ChecklistItem from '../Forms/ChecklistItem';
import DateInput from '../Forms/DateInput';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { QUARTERS } from '../../utils/pageRegistry';

const SUBJECTS = ['Math', 'English', 'Science', 'History'];

function ChildGoalSection({ childIndex, quarter }) {
  const { getChildName } = usePlanner();
  const color = childColors[childIndex];
  const name = getChildName(childIndex);
  const prefix = `${quarter}_goals_c${childIndex}`;

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
        <h3 className="font-semibold text-charcoal">{name}</h3>
      </div>

      <div className="space-y-5">
        {SUBJECTS.map((subject) => {
          const key = `${prefix}_${subject.toLowerCase()}`;
          return (
            <div key={subject} className="space-y-2">
              <h4 className="text-xs font-bold text-primary uppercase">{subject} Goal</h4>
              <div className="space-y-1.5 pl-2">
                <div className="flex items-start gap-2">
                  <ChecklistItem field={`${key}_goalCheck`} label="" className="mt-0.5" />
                  <TextInput field={`${key}_goal`} placeholder="Goal" className="flex-1" />
                </div>
                <div className="flex items-start gap-2">
                  <ChecklistItem field={`${key}_whyCheck`} label="" className="mt-0.5" />
                  <TextInput field={`${key}_why`} placeholder="Why this goal matters" className="flex-1" />
                </div>
                <div className="flex items-start gap-2">
                  <ChecklistItem field={`${key}_howCheck`} label="" className="mt-0.5" />
                  <TextInput field={`${key}_how`} placeholder="How to achieve it" className="flex-1" />
                </div>
                <div className="flex items-start gap-2">
                  <ChecklistItem field={`${key}_successCheck`} label="" className="mt-0.5" />
                  <TextInput field={`${key}_success`} placeholder="What success looks like" className="flex-1" />
                </div>
                <div className="flex items-start gap-2">
                  <ChecklistItem field={`${key}_checkinCheck`} label="" className="mt-0.5" />
                  <DateInput field={`${key}_checkin`} label="Check-in date" className="flex-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function QuarterlyGoalsPage() {
  const { quarter } = useParams();
  const q = QUARTERS.find((x) => x.key === quarter) || QUARTERS[0];
  const qIdx = QUARTERS.indexOf(q);
  const pageNum = 13 + qIdx;

  return (
    <PageWrapper
      title={`Quarter ${qIdx + 1} Detailed Goal Planning`}
      pageNum={pageNum}
      colorBar={`linear-gradient(90deg, #4A6FA5, #3A9B6A)`}
    >
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <ChildGoalSection key={i} childIndex={i} quarter={quarter} />
        ))}
      </div>
    </PageWrapper>
  );
}
