import { useParams } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import TextArea from '../Forms/TextArea';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { WEEKS } from '../../utils/pageRegistry';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { INLINE_INPUT_CLASS } from '../Forms/formStyles';

const SUBJECTS = [
  { key: 'math', label: 'Math', time: '9:00 AM' },
  { key: 'english', label: 'English', time: '10:30 AM' },
  { key: 'science', label: 'Science', time: '1:00 PM' },
  { key: 'history', label: 'History', time: '2:30 PM' },
];

function DayPlan({ dayName, dayDate, weekKey, childIndex }) {
  const { getChildName, getValue, updateField } = usePlanner();
  const color = childColors[childIndex];
  const prefix = `${weekKey}_${dayName.toLowerCase()}_c${childIndex}`;

  return (
    <div className="py-2 border-b border-light-gray/40 last:border-b-0">
      {SUBJECTS.map((sub) => (
        <div key={sub.key} className="flex flex-col sm:flex-row sm:items-center gap-3 py-1.5 hover:bg-cream/40 transition-colors rounded-lg px-2 group">
          <div className="flex items-center gap-2 w-36 shrink-0">
            <span className="text-[10px] text-medium-gray font-mono">{sub.time}</span>
            <span className="text-[11px] font-bold text-dark-gray uppercase tracking-wider">{sub.label}</span>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              value={getValue(`${prefix}_${sub.key}_curr`, '')}
              onChange={(e) => updateField(`${prefix}_${sub.key}_curr`, e.target.value)}
              placeholder="Curriculum/Resource"
              className={INLINE_INPUT_CLASS}
            />
            <input
              type="text"
              value={getValue(`${prefix}_${sub.key}_lesson`, '')}
              onChange={(e) => updateField(`${prefix}_${sub.key}_lesson`, e.target.value)}
              placeholder="Lesson/Pages"
              className={INLINE_INPUT_CLASS}
            />
            <input
              type="text"
              value={getValue(`${prefix}_${sub.key}_notes`, '')}
              onChange={(e) => updateField(`${prefix}_${sub.key}_notes`, e.target.value)}
              placeholder="Notes..."
              className={INLINE_INPUT_CLASS}
            />
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
      title={`Week of ${w.dateRange}`}
      description="Plan your daily lessons and block schedule your week."
    >
      <div className="space-y-6">
        
        {/* Child Selection Header */}
        <Card className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-cream/30">
          <span className="text-sm font-semibold text-charcoal">Student Profiles:</span>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Badge key={i} variant="gray" className="gap-1.5 px-3 py-1.5" style={{ backgroundColor: childColors[i].bg, borderColor: childColors[i].hex, color: childColors[i].hex }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: childColors[i].hex }} />
                {getChildName(i) || `Student ${i}`}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Weekdays */}
        <div className="space-y-6">
          {weekdays.map((day) => (
            <Card key={day.dayName} noPadding className="overflow-hidden">
              <div className="bg-cream/40 px-5 py-3 border-b border-light-gray/60 flex items-center justify-between">
                <h3 className="text-sm font-bold text-charcoal tracking-wide">{day.dayName}</h3>
                <span className="text-[11px] font-semibold text-medium-gray">{day.dayDate}</span>
              </div>
              <div className="p-5 space-y-6 bg-white">
                {[1, 2, 3, 4].map((childIdx) => (
                  <div key={childIdx} className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1 h-px bg-light-gray/40"></div>
                      <Badge variant="gray" className="px-2" style={{ color: childColors[childIdx].hex, borderColor: childColors[childIdx].hex, backgroundColor: 'white' }}>
                        {getChildName(childIdx) || `Student ${childIdx}`}
                      </Badge>
                      <div className="flex-1 h-px bg-light-gray/40"></div>
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
            </Card>
          ))}
        </div>

        {/* Weekly Notes */}
        <Card className="bg-cream/30 mt-8">
          <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-4">
            Weekly Wrap-up
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TextArea field={`${week}_wins`} label="Wins & Progress" rows={3} />
            <TextArea field={`${week}_challenges`} label="Challenges" rows={3} />
            <TextArea field={`${week}_nextWeek`} label="Next Week Adjustments" rows={3} />
          </div>
        </Card>
        
      </div>
    </PageWrapper>
  );
}
