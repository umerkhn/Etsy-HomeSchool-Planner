import { useParams } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import TextArea from '../Forms/TextArea';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { WEEKS } from '../../utils/pageRegistry';

const SUBJECTS = [
  { key: 'math', label: 'MATH', time: '9:00–10:00 AM' },
  { key: 'english', label: 'ENGLISH', time: '10:30–11:30 AM' },
  { key: 'science', label: 'SCIENCE', time: '1:00–2:00 PM' },
  { key: 'history', label: 'HISTORY', time: '2:30–3:30 PM' },
];

function DayPlan({ dayName, dayDate, weekKey, childIndex }) {
  const { getChildName } = usePlanner();
  const color = childColors[childIndex];
  const prefix = `${weekKey}_${dayName.toLowerCase()}_c${childIndex}`;
  const name = getChildName(childIndex);

  return (
    <div className="space-y-2">
      {SUBJECTS.map((sub) => (
        <div key={sub.key} className="flex flex-wrap items-start gap-2 pl-4">
          <span className="text-xs text-medium-gray mt-1 w-28 flex-shrink-0">
            🕒 {sub.time}
          </span>
          <span className="text-xs font-bold text-primary w-16 mt-1 flex-shrink-0">{sub.label}</span>
          <div className="flex-1 min-w-[150px] grid grid-cols-1 sm:grid-cols-3 gap-1">
            <TextInput field={`${prefix}_${sub.key}_curr`} placeholder="Curriculum" />
            <TextInput field={`${prefix}_${sub.key}_lesson`} placeholder="Lesson" />
            <TextInput field={`${prefix}_${sub.key}_notes`} placeholder="Notes" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WeeklyPlanPage() {
  const { week } = useParams();
  const { getChildName } = usePlanner();
  const w = WEEKS.find((x) => x.key === week) || WEEKS[0];
  const wIdx = WEEKS.indexOf(w);
  const pageNum = 41 + wIdx;

  // Build 5 weekdays
  const weekdays = [];
  for (let d = 0; d < 5; d++) {
    const date = new Date(w.startDate);
    date.setDate(date.getDate() + d);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    weekdays.push({ dayName, dayDate, fullDate: `${dayName}, ${dayDate}` });
  }

  return (
    <PageWrapper
      title={`Week of: ${w.dateRange}`}
      pageNum={pageNum}
      colorBar={`linear-gradient(90deg, ${childColors[1].hex}, ${childColors[2].hex}, ${childColors[3].hex}, ${childColors[4].hex})`}
    >
      <div className="space-y-6">
        {/* Color Legend */}
        <div className="flex flex-wrap gap-3 bg-cream rounded-xl p-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: childColors[i].hex }} />
              <span className="text-xs text-charcoal">
                {getChildName(i)} ({childColors[i].name})
              </span>
            </div>
          ))}
        </div>

        {/* Each Weekday */}
        {weekdays.map((day) => (
          <div key={day.dayName} className="border border-light-gray rounded-xl overflow-hidden">
            <div className="bg-primary/5 px-4 py-2 border-b border-light-gray">
              <h3 className="text-sm font-bold text-primary uppercase">{day.fullDate}</h3>
            </div>
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4].map((childIdx) => (
                <div key={childIdx}>
                  <div
                    className="flex items-center gap-2 mb-2 pb-1 border-b"
                    style={{ borderColor: childColors[childIdx].light }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ backgroundColor: childColors[childIdx].hex }}
                    >
                      {childIdx}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: childColors[childIdx].hex }}>
                      {getChildName(childIdx)}
                    </span>
                  </div>
                  <DayPlan
                    dayName={day.dayName}
                    dayDate={day.dayDate}
                    weekKey={week}
                    childIndex={childIdx}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Weekly Notes */}
        <div className="bg-cream rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider">
            Weekly Notes
          </h3>
          <TextArea field={`${week}_wins`} label="Wins/Progress" rows={2} />
          <TextArea field={`${week}_challenges`} label="Challenges" rows={2} />
          <TextArea field={`${week}_nextWeek`} label="Next week adjustments" rows={2} />
        </div>
      </div>
    </PageWrapper>
  );
}
