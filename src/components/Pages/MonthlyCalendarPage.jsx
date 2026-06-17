import { useParams } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import { usePlanner } from '../../context/PlannerContext';
import { MONTHS } from '../../utils/pageRegistry';
import { Card } from '../UI/Card';

export default function MonthlyCalendarPage() {
  const { month } = useParams();
  const { getValue, updateField } = usePlanner();
  const m = MONTHS.find((x) => x.key === month) || MONTHS[0];

  // Build calendar grid
  const firstDay = new Date(m.year, m.month, 1).getDay();
  const daysInMonth = new Date(m.year, m.month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  while (weeks[weeks.length - 1].length < 7) {
    weeks[weeks.length - 1].push(null);
  }

  return (
    <PageWrapper 
      title={`${m.label} Calendar`} 
      description="Plan your month at a high level. Add events directly to the dates."
    >
      <div className="space-y-6">
        
        {/* Calendar Grid */}
        <Card noPadding className="overflow-hidden border-light-gray/60 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-cream/50">
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
                    <th key={d} className="py-2.5 text-[10px] font-bold text-medium-gray text-center border-b border-r border-light-gray/60 uppercase tracking-wider w-[14.28%] last:border-r-0">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weeks.map((week, wi) => (
                  <tr key={wi} className="group/row">
                    {week.map((day, di) => (
                      <td 
                        key={di} 
                        className={`border-b border-r border-light-gray/60 p-1.5 align-top h-24 sm:h-32 transition-colors last:border-r-0 ${!day ? 'bg-cream/20' : 'hover:bg-cream/30'}`}
                      >
                        {day && (
                          <div className="h-full flex flex-col">
                            <span className="text-xs font-semibold text-charcoal mb-1">{day}</span>
                            <textarea
                              value={getValue(`cal_${month}_${day}`, '')}
                              onChange={(e) => updateField(`cal_${month}_${day}`, e.target.value)}
                              placeholder="Event..."
                              className="flex-1 w-full text-[10px] border-none outline-none bg-transparent p-0 text-dark-gray resize-none placeholder:text-transparent focus:placeholder:text-light-gray"
                              title="Add event"
                            />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Below calendar notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-cream/30">
            <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-3">
              Holidays / Breaks
            </h3>
            <TextInput field={`cal_${month}_holidays`} placeholder="Add holidays..." className="bg-white" />
          </Card>
          
          <Card className="bg-cream/30">
            <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-3">
              Key Dates
            </h3>
            <div className="space-y-2">
              <TextInput field={`cal_${month}_keydate1`} placeholder="Date 1" className="bg-white" />
              <TextInput field={`cal_${month}_keydate2`} placeholder="Date 2" className="bg-white" />
            </div>
          </Card>
          
          <Card className="bg-cream/30">
            <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-3">
              Birthdays
            </h3>
            <div className="space-y-2">
              <TextInput field={`cal_${month}_bday1`} placeholder="Birthday 1" className="bg-white" />
              <TextInput field={`cal_${month}_bday2`} placeholder="Birthday 2" className="bg-white" />
            </div>
          </Card>
          
          <Card className="bg-cream/30">
            <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-3">
              Activities / Trips
            </h3>
            <div className="space-y-2">
              <TextInput field={`cal_${month}_activity1`} placeholder="Activity 1" className="bg-white" />
              <TextInput field={`cal_${month}_activity2`} placeholder="Activity 2" className="bg-white" />
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
