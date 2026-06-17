import PageWrapper from '../Layout/PageWrapper';
import ChecklistItem from '../Forms/ChecklistItem';
import { childColors } from '../../utils/colorSystem';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';

export default function HowToUsePage() {
  return (
    <PageWrapper 
      title="How To Use This Workspace" 
      description="A quick guide to navigating and organizing your planner."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Col: Sections */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-2">Workflow Sections</h3>
          
          {[
            { num: 1, title: 'Yearly Planning', desc: 'Set your mission, goals, and academic framework for the entire year.' },
            { num: 2, title: 'Quarterly Planning', desc: 'Break the year into manageable chunks. Set goals and adjust your approach every 3 months.' },
            { num: 3, title: 'Monthly Planning', desc: 'Plan month-by-month with calendar views and detailed goal-setting.' },
            { num: 4, title: 'Weekly Planning', desc: 'Your day-to-day lesson planner. Track time blocks, and capture weekly wins.' },
            { num: 5, title: 'Tracking & Records', desc: 'Attendance, grades, reading logs, expenses, and portfolio records.' },
          ].map((section) => (
            <Card key={section.num} className="flex gap-4 items-start" noPadding>
              <div className="p-4 sm:p-5 flex gap-4 w-full items-start">
                <div className="w-8 h-8 rounded-lg bg-light-gray flex items-center justify-center shrink-0">
                  <span className="text-charcoal font-bold text-sm">{section.num}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">{section.title}</h4>
                  <p className="text-sm text-dark-gray leading-relaxed">{section.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Right Col: Colors & Tips */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-3">Color System</h3>
            <Card className="space-y-3">
              <p className="text-xs text-medium-gray leading-relaxed mb-4">
                Each child is assigned a signature color that appears throughout the planner as an accent badge or border:
              </p>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div
                      className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: childColors[i].hex }}
                    />
                    <span className="text-xs font-medium text-dark-gray">
                      Child {i} Profile
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-3">Success Checklist</h3>
            <Card className="space-y-2.5">
              <ChecklistItem field="tip_review_weekly" label="Review planner weekly" />
              <ChecklistItem field="tip_update_sunday" label="Update lesson plans Sunday" />
              <ChecklistItem field="tip_track_progress" label="Track progress as you go" />
              <ChecklistItem field="tip_be_flexible" label="Be flexible — adjust as needed" />
              <ChecklistItem field="tip_celebrate" label="Celebrate your wins" />
            </Card>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
