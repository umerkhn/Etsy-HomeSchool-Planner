import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import PageWrapper from '../Layout/PageWrapper';

export default function CoverPage() {
  const { getValue, updateField } = usePlanner();

  return (
    <PageWrapper>
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left: Branding & Welcome */}
        <div className="lg:w-1/3 space-y-6">
          <div>
            <Badge variant="primary" className="mb-3 px-2 py-1">2025–2026 Academic Year</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal leading-tight tracking-tight mb-4">
              Homeschool<br />Workspace
            </h1>
            <p className="text-medium-gray text-sm leading-relaxed">
              Your central hub for organizing, planning, and thriving this academic year. 
              Designed for clarity and focus.
            </p>
          </div>

          <div className="pt-4 border-t border-light-gray/60 flex items-center gap-2">
            <span className="text-xs font-semibold text-dark-gray">Child Profiles:</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: childColors[i].hex }}
                  title={`Child ${i}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Setup Form */}
        <div className="lg:w-2/3">
          <Card className="space-y-8">
            <div>
              <h2 className="text-lg font-bold text-charcoal mb-4">Family Profile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dark-gray mb-1.5 block">Family Name</label>
                  <input
                    type="text"
                    value={getValue('familyName')}
                    onChange={(e) => updateField('familyName', e.target.value)}
                    placeholder="e.g. The Smiths"
                    className="w-full border border-light-gray rounded-lg px-3 py-2 text-sm focus:border-dark-gray focus:ring-1 focus:ring-dark-gray/20 outline-none transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-dark-gray mb-1.5 block">Contact Email</label>
                  <input
                    type="email"
                    value={getValue('contactEmail')}
                    onChange={(e) => updateField('contactEmail', e.target.value)}
                    placeholder="email@example.com"
                    className="w-full border border-light-gray rounded-lg px-3 py-2 text-sm focus:border-dark-gray focus:ring-1 focus:ring-dark-gray/20 outline-none transition-all shadow-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-dark-gray mb-1.5 block">Official Start Date</label>
                  <input
                    type="date"
                    value={getValue('startDate')}
                    onChange={(e) => updateField('startDate', e.target.value)}
                    className="w-full sm:w-1/2 border border-light-gray rounded-lg px-3 py-2 text-sm focus:border-dark-gray focus:ring-1 focus:ring-dark-gray/20 outline-none transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-light-gray/60">
              <h2 className="text-lg font-bold text-charcoal mb-4">Student Roster</h2>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-center p-3 rounded-lg border border-light-gray/50 hover:border-light-gray transition-colors bg-cream/30"
                  >
                    <div 
                      className="w-2.5 h-8 rounded-full shrink-0" 
                      style={{ backgroundColor: childColors[i].hex }}
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={getValue(`child${i}Name`)}
                        onChange={(e) => updateField(`child${i}Name`, e.target.value)}
                        placeholder={`Student ${i} Name`}
                        className="w-full bg-transparent border-none text-sm font-medium focus:outline-none placeholder:text-medium-gray"
                      />
                    </div>
                    <div className="w-16 border-l border-light-gray/60 pl-3">
                      <input
                        type="text"
                        value={getValue(`child${i}Age`)}
                        onChange={(e) => updateField(`child${i}Age`, e.target.value)}
                        placeholder="Age"
                        className="w-full bg-transparent border-none text-sm text-center focus:outline-none placeholder:text-medium-gray"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
