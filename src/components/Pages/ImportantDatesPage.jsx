import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import DateInput from '../Forms/DateInput';

const HOLIDAYS = [
  { label: 'New Year\'s Day', date: 'January 1, 2026' },
  { label: 'MLK Jr. Day', date: 'January 19, 2026' },
  { label: 'Presidents Day', date: 'February 16, 2026' },
  { label: 'Spring Break', date: 'March 2026' },
  { label: 'Easter', date: 'April 5, 2026' },
  { label: 'Memorial Day', date: 'May 25, 2026' },
  { label: 'Independence Day', date: 'July 4, 2026' },
  { label: 'Labor Day', date: 'September 1, 2025' },
  { label: 'Columbus Day', date: 'October 13, 2025' },
  { label: 'Thanksgiving', date: 'November 27, 2025' },
  { label: 'Christmas Break', date: 'December 2025' },
];

export default function ImportantDatesPage() {
  return (
    <PageWrapper title="Important Dates & Holidays 2025–2026" pageNum={8}>
      <div className="space-y-8">
        {/* Pre-filled Holidays */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Holidays & Observances
          </h3>
          <div className="space-y-2">
            {HOLIDAYS.map((h, i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                <span className="text-sm">📅</span>
                <TextInput
                  field={`holiday_name_${i}`}
                  placeholder={h.label}
                  className="flex-1"
                />
                <TextInput
                  field={`holiday_date_${i}`}
                  placeholder={h.date}
                  className="w-48"
                />
              </div>
            ))}
          </div>
        </div>

        <hr className="border-light-gray" />

        {/* Family Dates */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Family Dates to Remember
          </h3>
          <div className="space-y-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm">📅</span>
                <TextInput field={`family_date_name_${i}`} placeholder="Event name" className="flex-1" />
                <DateInput field={`family_date_${i}`} className="w-44" />
              </div>
            ))}
          </div>
        </div>

        <hr className="border-light-gray" />

        {/* Testing/Assessment Dates */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Testing/Assessment Dates
          </h3>
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm">📅</span>
                <TextInput field={`test_date_name_${i}`} placeholder="Test/Assessment" className="flex-1" />
                <DateInput field={`test_date_${i}`} className="w-44" />
              </div>
            ))}
          </div>
        </div>

        <hr className="border-light-gray" />

        {/* Field Trips Planned */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Field Trips Planned
          </h3>
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm">📅</span>
                <TextInput field={`ft_planned_name_${i}`} placeholder="Trip destination" className="flex-1" />
                <DateInput field={`ft_planned_date_${i}`} className="w-44" />
              </div>
            ))}
          </div>
        </div>

        <hr className="border-light-gray" />

        {/* Important Deadlines */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Important Deadlines
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm">📅</span>
              <span className="text-sm text-charcoal w-48">Transcripts/Records Due:</span>
              <DateInput field="deadline_transcripts" className="flex-1" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm">📅</span>
              <span className="text-sm text-charcoal w-48">Report Card Due:</span>
              <DateInput field="deadline_report_card" className="flex-1" />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
