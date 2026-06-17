import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import DateInput from '../Forms/DateInput';
import { Card } from '../UI/Card';

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
    <PageWrapper 
      title="Important Dates & Holidays" 
      description="Track observances, family events, and academic deadlines."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Col */}
        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">Holidays & Observances</h3>
              <span className="text-[10px] font-semibold text-medium-gray px-2 py-0.5 bg-cream rounded-md">2025-2026</span>
            </div>
            <div className="space-y-2">
              {HOLIDAYS.map((h, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 py-1">
                  <TextInput
                    field={`holiday_name_${i}`}
                    placeholder={h.label}
                    className="flex-1"
                  />
                  <TextInput
                    field={`holiday_date_${i}`}
                    placeholder={h.date}
                    className="sm:w-40 shrink-0"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Col */}
        <div className="space-y-6">
          
          <Card>
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4">Family Dates to Remember</h3>
            <div className="space-y-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <TextInput field={`family_date_name_${i}`} placeholder="Event name (e.g. Birthday)" className="flex-1" />
                  <DateInput field={`family_date_${i}`} className="sm:w-40 shrink-0" />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4">Testing & Assessments</h3>
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <TextInput field={`test_date_name_${i}`} placeholder="Assessment type" className="flex-1" />
                  <DateInput field={`test_date_${i}`} className="sm:w-40 shrink-0" />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4">Field Trips Planned</h3>
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <TextInput field={`ft_planned_name_${i}`} placeholder="Destination" className="flex-1" />
                  <DateInput field={`ft_planned_date_${i}`} className="sm:w-40 shrink-0" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-cream/40">
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4">Academic Deadlines</h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-sm font-medium text-dark-gray flex-1">Transcripts/Records Due:</span>
                <DateInput field="deadline_transcripts" className="sm:w-40 shrink-0" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-sm font-medium text-dark-gray flex-1">Report Card Due:</span>
                <DateInput field="deadline_report_card" className="sm:w-40 shrink-0" />
              </div>
            </div>
          </Card>

        </div>

      </div>
    </PageWrapper>
  );
}
