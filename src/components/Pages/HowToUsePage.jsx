import PageWrapper from '../Layout/PageWrapper';
import ChecklistItem from '../Forms/ChecklistItem';
import { childColors } from '../../utils/colorSystem';

export default function HowToUsePage() {
  return (
    <PageWrapper title="How To Use This Planner" pageNum={2}>
      <div className="space-y-8">
        {/* Sections */}
        {[
          { num: 1, title: 'Yearly Planning', desc: 'Set your mission, goals, and academic framework for the entire year. Define your family\'s "why" and map out the big picture.' },
          { num: 2, title: 'Quarterly Planning', desc: 'Break the year into manageable chunks. Set goals, track progress, and adjust your approach every 3 months.' },
          { num: 3, title: 'Monthly Planning', desc: 'Plan month-by-month with calendar views and detailed goal-setting. Track curriculum progress for each child.' },
          { num: 4, title: 'Weekly Planning', desc: 'Your day-to-day lesson planner. Schedule subjects, track time blocks, and capture weekly wins and challenges.' },
          { num: 5, title: 'Tracking & Records', desc: 'Attendance, grades, reading logs, expenses, field trips, and more. Everything you need for complete record-keeping.' },
        ].map((section) => (
          <div key={section.num} className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold text-sm">{section.num}</span>
            </div>
            <div>
              <h3 className="font-semibold text-charcoal mb-1">Section {section.num}: {section.title}</h3>
              <p className="text-sm text-dark-gray leading-relaxed">{section.desc}</p>
            </div>
          </div>
        ))}

        {/* Color System */}
        <div className="bg-cream rounded-xl p-6 mt-8">
          <h3 className="font-semibold text-charcoal mb-4">Color System</h3>
          <p className="text-sm text-dark-gray mb-4">
            Each child is assigned a signature color that appears throughout the planner:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ backgroundColor: childColors[i].light }}
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: childColors[i].hex }}
                />
                <span className="text-xs font-medium text-charcoal">
                  Child {i} — {childColors[i].name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips for Success */}
        <div className="mt-8">
          <h3 className="font-semibold text-charcoal mb-4">Tips for Success</h3>
          <div className="space-y-1">
            <ChecklistItem field="tip_review_weekly" label="Review this planner weekly" />
            <ChecklistItem field="tip_update_sunday" label="Update weekly lesson plans Sunday evening" />
            <ChecklistItem field="tip_track_progress" label="Track progress as you go" />
            <ChecklistItem field="tip_be_flexible" label="Be flexible — adjust as needed" />
            <ChecklistItem field="tip_celebrate" label="Celebrate wins!" />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
