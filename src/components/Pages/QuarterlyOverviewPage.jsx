import { useParams } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import TextArea from '../Forms/TextArea';
import TextInput from '../Forms/TextInput';
import DateInput from '../Forms/DateInput';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { QUARTERS } from '../../utils/pageRegistry';

const SUBJECTS = ['Math', 'English', 'Science', 'History'];

function ProgressBar({ field }) {
  const { getValue, updateField } = usePlanner();
  const val = parseInt(getValue(field, '0')) || 0;

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-3 bg-light-gray rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${Math.min(val, 100)}%` }}
        />
      </div>
      <input
        type="number"
        min="0"
        max="100"
        value={getValue(field, '')}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder="0"
        className="w-14 border border-light-gray rounded px-2 py-0.5 text-xs text-center focus:border-primary outline-none"
      />
      <span className="text-xs text-medium-gray">%</span>
    </div>
  );
}

export default function QuarterlyOverviewPage() {
  const { quarter } = useParams();
  const { getChildName } = usePlanner();
  const q = QUARTERS.find((x) => x.key === quarter) || QUARTERS[0];
  const qIdx = QUARTERS.indexOf(q);
  const pageNum = 9 + qIdx;

  return (
    <PageWrapper
      title={`Quarter ${qIdx + 1}: ${q.months} ${q.year}`}
      pageNum={pageNum}
      colorBar={`linear-gradient(90deg, #4A6FA5, #3A9B6A)`}
    >
      <div className="space-y-8">
        {/* Quarter Goals */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Quarter Goals
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <span className="mt-2">🎯</span>
              <TextArea field={`${quarter}_familyGoal`} label="Family Goal" rows={2} className="flex-1" />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-2">🎯</span>
                <div className="flex-1">
                  <label className="text-xs font-medium mb-1 block" style={{ color: childColors[i].hex }}>
                    {getChildName(i)}
                  </label>
                  <textarea
                    className="w-full border border-light-gray rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none resize-vertical"
                    rows={2}
                    placeholder={`${getChildName(i)}'s goal for this quarter`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-light-gray" />

        {/* Quarter Focus */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Quarter Focus
          </h3>
          <div className="space-y-3">
            <TextArea field={`${quarter}_teachingFocus`} label="Main Teaching Focus" rows={2} />
            <TextArea field={`${quarter}_specialProjects`} label="Special Projects or Units" rows={2} />
            <TextArea field={`${quarter}_fieldTrips`} label="Field Trips/Experiences Planned" rows={2} />
          </div>
        </div>

        <hr className="border-light-gray" />

        {/* Progress Tracking */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Progress Tracking
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-light-gray">
                  <th className="text-left py-2 px-2 text-xs font-semibold text-dark-gray w-28">Child</th>
                  {SUBJECTS.map((s) => (
                    <th key={s} className="text-left py-2 px-2 text-xs font-semibold text-dark-gray">{s}</th>
                  ))}
                  <th className="text-left py-2 px-2 text-xs font-semibold text-dark-gray">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-cream/50' : ''}>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: childColors[i].hex }}
                        />
                        <span className="text-xs font-medium">{getChildName(i)}</span>
                      </div>
                    </td>
                    {SUBJECTS.map((s) => (
                      <td key={s} className="py-2 px-2">
                        <ProgressBar field={`${quarter}_c${i}_${s.toLowerCase()}_progress`} />
                      </td>
                    ))}
                    <td className="py-1 px-2">
                      <input
                        type="text"
                        placeholder="Notes"
                        className="w-full border border-light-gray rounded px-2 py-1 text-xs focus:border-primary outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <hr className="border-light-gray" />

        {/* Challenges & Adjustments */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4">
            Challenges & Adjustments
          </h3>
          <div className="space-y-3">
            <TextArea field={`${quarter}_workingWell`} label="What's working well?" rows={2} />
            <TextArea field={`${quarter}_needsAdjustment`} label="What needs adjustment?" rows={2} />
            <TextArea field={`${quarter}_changesNextQ`} label="Changes to make next quarter" rows={2} />
          </div>
        </div>

        <hr className="border-light-gray" />

        {/* Footer */}
        <div className="flex flex-wrap gap-4">
          <DateInput field={`${quarter}_reviewDate`} label="Date" className="w-44" />
          <TextInput field={`${quarter}_reviewedBy`} label="Reviewed by" className="flex-1" />
        </div>
      </div>
    </PageWrapper>
  );
}
