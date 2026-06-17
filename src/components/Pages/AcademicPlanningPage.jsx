import { usePlanner } from '../../context/PlannerContext';
import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import DateInput from '../Forms/DateInput';
import { Card } from '../UI/Card';
import { INLINE_INPUT_CLASS } from '../Forms/formStyles';

const TERMS = [
  { num: 1, label: 'Term 1: August – November', weeks: '16 weeks' },
  { num: 2, label: 'Term 2: January – March', weeks: '12 weeks' },
  { num: 3, label: 'Term 3: April – June', weeks: '12 weeks' },
];

const MILESTONES_MONTHS = [
  'August', 'September', 'October', 'November', 'December', 'January',
  'February', 'March', 'April', 'May', 'June', 'July',
];

export default function AcademicPlanningPage() {
  const { getValue, updateField } = usePlanner();

  return (
    <PageWrapper 
      title="Academic Framework" 
      description="Define terms, schedules, and major milestones for the year."
    >
      <div className="space-y-8">
        
        {/* School Schedule */}
        <div>
          <h3 className="text-xs font-bold text-medium-gray uppercase tracking-wider mb-3">
            Schedule Overview
          </h3>
          <Card>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <TextInput field="schoolDaysPerWeek" label="Days per Week" placeholder="e.g. 5" />
              <TextInput field="schoolHoursPerDay" label="Hours per Day" placeholder="e.g. 4" />
              <TextInput field="totalWeeks" label="Total Weeks" placeholder="e.g. 36" />
              <TextInput field="totalSchoolDays" label="Total Days" placeholder="e.g. 180" />
            </div>
          </Card>
        </div>

        {/* Term Structure */}
        <div>
          <h3 className="text-xs font-bold text-medium-gray uppercase tracking-wider mb-3">
            Term Structure
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TERMS.map((term) => (
              <Card key={term.num} className="bg-cream/30">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-charcoal">{term.label}</h4>
                  <p className="text-xs text-medium-gray">{term.weeks}</p>
                </div>
                <div className="space-y-3">
                  <DateInput field={`term${term.num}Start`} label="Start Date" />
                  <DateInput field={`term${term.num}End`} label="End Date" />
                  <TextInput field={`term${term.num}Break`} label="Scheduled Breaks" placeholder="e.g. Fall Break" />
                  <TextInput field={`term${term.num}Goals`} label="Term Focus" placeholder="Main objective" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Milestones Table */}
        <div>
          <h3 className="text-xs font-bold text-medium-gray uppercase tracking-wider mb-3">
            Monthly Milestones
          </h3>
          <Card noPadding>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-cream/50 border-b border-light-gray/60">
                  <tr>
                    <th className="py-2.5 px-4 text-[11px] font-semibold text-medium-gray uppercase tracking-wider w-32">Month</th>
                    <th className="py-2.5 px-4 text-[11px] font-semibold text-medium-gray uppercase tracking-wider">Event / Goal</th>
                    <th className="py-2.5 px-4 text-[11px] font-semibold text-medium-gray uppercase tracking-wider w-40">Child(ren)</th>
                    <th className="py-2.5 px-4 text-[11px] font-semibold text-medium-gray uppercase tracking-wider w-64">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-gray/40">
                  {MILESTONES_MONTHS.map((month) => {
                    const keyMonth = month.toLowerCase();
                    return (
                      <tr key={month} className="hover:bg-cream/30 transition-colors">
                        <td className="py-1 px-4 text-xs font-medium text-dark-gray">{month}</td>
                        <td className="py-1 px-3">
                          <input
                            type="text"
                            value={getValue(`mile_${keyMonth}_event`)}
                            onChange={(e) => updateField(`mile_${keyMonth}_event`, e.target.value)}
                            className={INLINE_INPUT_CLASS}
                            placeholder="Add event..."
                          />
                        </td>
                        <td className="py-1 px-3">
                          <input
                            type="text"
                            value={getValue(`mile_${keyMonth}_child`)}
                            onChange={(e) => updateField(`mile_${keyMonth}_child`, e.target.value)}
                            className={INLINE_INPUT_CLASS}
                            placeholder="All"
                          />
                        </td>
                        <td className="py-1 px-3">
                          <input
                            type="text"
                            value={getValue(`mile_${keyMonth}_notes`)}
                            onChange={(e) => updateField(`mile_${keyMonth}_notes`, e.target.value)}
                            className={INLINE_INPUT_CLASS}
                            placeholder="..."
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

      </div>
    </PageWrapper>
  );
}
