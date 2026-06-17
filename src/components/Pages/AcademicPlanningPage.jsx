import { usePlanner } from '../../context/PlannerContext';
import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import TextArea from '../Forms/TextArea';
import DateInput from '../Forms/DateInput';

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
    <PageWrapper title="Year Overview & Planning Framework" pageNum={5}>
      <div className="space-y-8">
        {/* School Year Structure */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            School Year Structure
          </h3>
          {TERMS.map((term) => (
            <div key={term.num} className="mb-6 bg-cream rounded-xl p-5">
              <h4 className="text-sm font-semibold text-primary mb-3">
                {term.label} ({term.weeks})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DateInput field={`term${term.num}Start`} label="Start Date" />
                <DateInput field={`term${term.num}End`} label="End Date" />
                <TextInput field={`term${term.num}Break`} label="Break" placeholder="e.g., Thanksgiving Break" />
                <TextInput field={`term${term.num}Goals`} label="Goals" placeholder="Main goals for this term" />
              </div>
            </div>
          ))}
        </div>

        <hr className="border-light-gray" />

        {/* School Schedule */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            School Schedule
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <TextInput field="schoolDaysPerWeek" label="School Days/Week" placeholder="5" />
            <TextInput field="schoolHoursPerDay" label="Hours/Day" placeholder="6" />
            <TextInput field="totalWeeks" label="Total Weeks" placeholder="36" />
            <TextInput field="totalSchoolDays" label="Total School Days" placeholder="180" />
          </div>
        </div>

        <hr className="border-light-gray" />

        {/* Key Milestones */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Key Milestones
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-light-gray">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-dark-gray">Month</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-dark-gray">Event/Milestone</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-dark-gray">Child(ren)</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-dark-gray">Notes</th>
                </tr>
              </thead>
              <tbody>
                {MILESTONES_MONTHS.map((month, i) => {
                  const keyMonth = month.toLowerCase();
                  return (
                    <tr key={month} className={i % 2 === 0 ? 'bg-cream/50' : ''}>
                      <td className="py-2 px-3 text-xs font-medium text-charcoal">{month}</td>
                      <td className="py-1 px-2">
                        <input
                          type="text"
                          value={getValue(`mile_${keyMonth}_event`)}
                          onChange={(e) => updateField(`mile_${keyMonth}_event`, e.target.value)}
                          className="w-full border border-light-gray rounded px-2 py-1 text-xs focus:border-primary outline-none"
                          placeholder="Event"
                        />
                      </td>
                      <td className="py-1 px-2">
                        <input
                          type="text"
                          value={getValue(`mile_${keyMonth}_child`)}
                          onChange={(e) => updateField(`mile_${keyMonth}_child`, e.target.value)}
                          className="w-full border border-light-gray rounded px-2 py-1 text-xs focus:border-primary outline-none"
                          placeholder="Child"
                        />
                      </td>
                      <td className="py-1 px-2">
                        <input
                          type="text"
                          value={getValue(`mile_${keyMonth}_notes`)}
                          onChange={(e) => updateField(`mile_${keyMonth}_notes`, e.target.value)}
                          className="w-full border border-light-gray rounded px-2 py-1 text-xs focus:border-primary outline-none"
                          placeholder="Notes"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
