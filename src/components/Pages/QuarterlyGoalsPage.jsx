import { useParams } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import ChecklistItem from '../Forms/ChecklistItem';
import DateInput from '../Forms/DateInput';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { QUARTERS } from '../../utils/pageRegistry';
import { Card } from '../UI/Card';

const SUBJECTS = ['Math', 'English', 'Science', 'History'];

function ChildGoalSection({ childIndex, quarter }) {
  const { getChildName } = usePlanner();
  const color = childColors[childIndex];
  const name = getChildName(childIndex) || `Student ${childIndex}`;
  const prefix = `${quarter}_goals_c${childIndex}`;

  return (
    <Card className="border-l-4" style={{ borderLeftColor: color.hex }}>
      <div className="flex items-center gap-3 mb-6 border-b border-light-gray/40 pb-4">
        <div
          className="w-8 h-8 rounded border border-light-gray shadow-sm flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: color.bg, color: color.hex }}
        >
          {childIndex}
        </div>
        <h3 className="font-bold text-charcoal text-base">{name}</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {SUBJECTS.map((subject) => {
          const key = `${prefix}_${subject.toLowerCase()}`;
          return (
            <div key={subject} className="bg-cream/30 p-4 rounded-xl border border-light-gray/40">
              <h4 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-4 border-b border-light-gray/40 pb-2">
                {subject} Goal
              </h4>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <ChecklistItem field={`${key}_goalCheck`} label="" />
                  <TextInput field={`${key}_goal`} placeholder="Primary goal" className="flex-1 bg-white" />
                </div>
                <div className="flex gap-2">
                  <ChecklistItem field={`${key}_whyCheck`} label="" />
                  <TextInput field={`${key}_why`} placeholder="Why it matters" className="flex-1 bg-white" />
                </div>
                <div className="flex gap-2">
                  <ChecklistItem field={`${key}_howCheck`} label="" />
                  <TextInput field={`${key}_how`} placeholder="How to achieve it" className="flex-1 bg-white" />
                </div>
                <div className="flex gap-2">
                  <ChecklistItem field={`${key}_successCheck`} label="" />
                  <TextInput field={`${key}_success`} placeholder="Definition of success" className="flex-1 bg-white" />
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-light-gray/40">
                  <span className="text-[10px] font-medium text-dark-gray uppercase">Check-in</span>
                  <DateInput field={`${key}_checkin`} className="w-40 bg-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default function QuarterlyGoalsPage() {
  const { quarter } = useParams();
  const q = QUARTERS.find((x) => x.key === quarter) || QUARTERS[0];

  return (
    <PageWrapper
      title={`${q.label} Goals`}
      description="Set deep, actionable academic goals for each student."
    >
      <div className="space-y-8">
        {[1, 2, 3, 4].map((i) => (
          <ChildGoalSection key={i} childIndex={i} quarter={quarter} />
        ))}
      </div>
    </PageWrapper>
  );
}
