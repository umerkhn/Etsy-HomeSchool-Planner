import { useParams } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import { usePlanner } from '../../context/PlannerContext';
import { MONTHS } from '../../utils/pageRegistry';

export default function MonthlyCalendarPage() {
  const { month } = useParams();
  const { getValue, updateField } = usePlanner();
  const m = MONTHS.find((x) => x.key === month) || MONTHS[0];
  const mIdx = MONTHS.indexOf(m);
  const pageNum = 17 + mIdx * 2;

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
    <PageWrapper title={m.label} pageNum={pageNum}>
      <div className="space-y-6">
        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <th key={d} className="py-2 text-xs font-semibold text-primary text-center border border-light-gray bg-cream/50 w-[14.28%]">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, wi) => (
                <tr key={wi}>
                  {week.map((day, di) => (
                    <td key={di} className="border border-light-gray p-1 align-top h-20 sm:h-24">
                      {day && (
                        <div>
                          <span className="text-xs font-semibold text-charcoal">{day}</span>
                          <input
                            type="text"
                            value={getValue(`cal_${month}_${day}`, '')}
                            onChange={(e) => updateField(`cal_${month}_${day}`, e.target.value)}
                            placeholder=""
                            className="w-full mt-1 text-[10px] border-none outline-none bg-transparent p-0 text-dark-gray placeholder:text-transparent focus:placeholder:text-medium-gray"
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

        {/* Below calendar notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Holidays/Breaks
            </h3>
            <TextInput field={`cal_${month}_holidays`} placeholder="Enter holidays this month" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Key Dates to Remember
            </h3>
            <div className="space-y-2">
              <TextInput field={`cal_${month}_keydate1`} placeholder="Key date 1" />
              <TextInput field={`cal_${month}_keydate2`} placeholder="Key date 2" />
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Birthdays This Month
            </h3>
            <div className="space-y-2">
              <TextInput field={`cal_${month}_bday1`} placeholder="Birthday 1" />
              <TextInput field={`cal_${month}_bday2`} placeholder="Birthday 2" />
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
              Field Trips/Activities
            </h3>
            <div className="space-y-2">
              <TextInput field={`cal_${month}_activity1`} placeholder="Activity 1" />
              <TextInput field={`cal_${month}_activity2`} placeholder="Activity 2" />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
