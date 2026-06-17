import { useParams } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import TextArea from '../Forms/TextArea';
import TextInput from '../Forms/TextInput';
import DateInput from '../Forms/DateInput';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { QUARTERS } from '../../utils/pageRegistry';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';

const SUBJECTS = ['Math', 'English', 'Science', 'History'];

function ProgressBar({ field }) {
  const { getValue, updateField } = usePlanner();
  const val = parseInt(getValue(field, '0')) || 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-light-gray/60 rounded-full overflow-hidden">
        <div
          className="h-full bg-charcoal rounded-full transition-all duration-300"
          style={{ width: `${Math.min(val, 100)}%` }}
        />
      </div>
      <div className="flex items-center gap-1 w-12">
        <input
          type="number"
          min="0"
          max="100"
          value={getValue(field, '')}
          onChange={(e) => updateField(field, e.target.value)}
          placeholder="0"
          className="w-8 bg-transparent text-xs text-right focus:outline-none focus:border-b focus:border-dark-gray font-mono font-medium"
        />
        <span className="text-[10px] text-medium-gray">%</span>
      </div>
    </div>
  );
}

export default function QuarterlyOverviewPage() {
  const { quarter } = useParams();
  const { getChildName, getValue, updateField } = usePlanner();
  const q = QUARTERS.find((x) => x.key === quarter) || QUARTERS[0];

  return (
    <PageWrapper
      title={`${q.label}`}
      description="Reflect on goals, track progress, and adjust your teaching focus."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-medium-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quarter Goals
            </h3>
            <div className="space-y-4">
              <TextArea field={`${quarter}_familyGoal`} label="Family Goal" rows={2} />
              <div className="pt-2 border-t border-light-gray/40">
                <h4 className="text-[10px] font-bold text-medium-gray uppercase tracking-wider mb-3">Child Goals</h4>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: childColors[i].hex }} />
                      <TextArea
                        field={`${quarter}_childGoal_c${i}`}
                        label={getChildName(i) || `Student ${i}`}
                        rows={2}
                        placeholder="Primary quarter goal"
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-medium-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Adjustments
            </h3>
            <div className="space-y-4">
              <TextArea field={`${quarter}_workingWell`} label="What is working well?" rows={2} />
              <TextArea field={`${quarter}_needsAdjustment`} label="What needs adjustment?" rows={2} />
              <TextArea field={`${quarter}_changesNextQ`} label="Changes for next quarter" rows={2} />
            </div>
          </Card>
        </div>

        {/* Right Col */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-medium-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Teaching Focus
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextArea field={`${quarter}_teachingFocus`} label="Main Teaching Focus" rows={3} />
              <TextArea field={`${quarter}_specialProjects`} label="Special Projects or Units" rows={3} />
            </div>
          </Card>

          <Card noPadding>
            <div className="p-4 border-b border-light-gray/60">
              <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4 text-medium-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Progress Tracking
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-cream/50 border-b border-light-gray/60">
                  <tr>
                    <th className="py-2.5 px-4 text-[10px] font-semibold text-medium-gray uppercase tracking-wider w-24">Student</th>
                    {SUBJECTS.map((s) => (
                      <th key={s} className="py-2.5 px-3 text-[10px] font-semibold text-medium-gray uppercase tracking-wider">{s}</th>
                    ))}
                    <th className="py-2.5 px-4 text-[10px] font-semibold text-medium-gray uppercase tracking-wider w-40">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-gray/40">
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i} className="hover:bg-cream/30 transition-colors">
                      <td className="py-3 px-4">
                        <Badge variant="gray" className="gap-1.5" style={{ backgroundColor: childColors[i].bg, borderColor: childColors[i].hex, color: childColors[i].hex }}>
                          {getChildName(i) || `Student ${i}`}
                        </Badge>
                      </td>
                      {SUBJECTS.map((s) => (
                        <td key={s} className="py-3 px-3">
                          <ProgressBar field={`${quarter}_c${i}_${s.toLowerCase()}_progress`} />
                        </td>
                      ))}
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={getValue(`${quarter}_c${i}_progress_notes`, '')}
                          onChange={(e) => updateField(`${quarter}_c${i}_progress_notes`, e.target.value)}
                          placeholder="..."
                          className="w-full bg-transparent border-b border-transparent hover:border-light-gray focus:border-dark-gray px-1 py-1 text-xs outline-none transition-colors"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4 border-t border-light-gray/60 pt-6">
            <TextInput field={`${quarter}_reviewedBy`} placeholder="Reviewed by (Name)" className="w-48" />
            <DateInput field={`${quarter}_reviewDate`} className="w-40" />
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
