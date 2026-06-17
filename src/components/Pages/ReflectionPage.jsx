import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';

export default function ReflectionPage() {
  const { getValue, updateField, getChildName } = usePlanner();

  return (
    <PageWrapper title="End-of-Year Reflection" pageNum={65}>
      <div className="space-y-10 animate-fade-in">
        {/* Overall Assessment */}
        <div className="bg-white rounded-2xl p-6 border border-light-gray shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-cream pb-2">
            Overall Year Assessment
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-charcoal block mb-1">
                What went WELL this year?
              </label>
              <textarea
                value={getValue('ref_well')}
                onChange={(e) => updateField('ref_well', e.target.value)}
                placeholder="Highlight your key achievements, standard milestones, moments of joy, or successful routines..."
                rows={3}
                className="w-full border border-light-gray rounded-xl p-3 text-xs outline-none focus:border-primary resize-none bg-cream/20"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-charcoal block mb-1">
                What was CHALLENGING?
              </label>
              <textarea
                value={getValue('ref_challenging')}
                onChange={(e) => updateField('ref_challenging', e.target.value)}
                placeholder="Identify struggles, subjects that were difficult, schedule issues, or curriculum changes..."
                rows={3}
                className="w-full border border-light-gray rounded-xl p-3 text-xs outline-none focus:border-primary resize-none bg-cream/20"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-charcoal block mb-1">
                What would we do DIFFERENTLY next year?
              </label>
              <textarea
                value={getValue('ref_differently')}
                onChange={(e) => updateField('ref_differently', e.target.value)}
                placeholder="Key lessons learned, schedule adjustments, or strategy shifts for the next academic year..."
                rows={3}
                className="w-full border border-light-gray rounded-xl p-3 text-xs outline-none focus:border-primary resize-none bg-cream/20"
              />
            </div>
          </div>
        </div>

        {/* Children Reflections */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((childIdx) => {
            const name = getChildName(childIdx);
            const color = childColors[childIdx];
            const baseKey = `ref_c${childIdx}`;

            return (
              <div
                key={childIdx}
                className="bg-white rounded-2xl p-6 border-l-4 shadow-sm border-light-gray space-y-4"
                style={{ borderLeftColor: color.hex }}
              >
                <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">
                  {name} Reflection (Parent + Child)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-cream/10 border border-cream rounded-xl p-3.5">
                    <label className="text-[10px] font-bold text-dark-gray block mb-1.5 uppercase tracking-wider">
                      Parent's Perspective
                    </label>
                    <textarea
                      value={getValue(`${baseKey}_parent`)}
                      onChange={(e) => updateField(`${baseKey}_parent`, e.target.value)}
                      placeholder={`Describe ${name}'s emotional, academic, and behavioral growth from your point of view...`}
                      rows={3}
                      className="w-full border border-light-gray rounded-lg p-2.5 text-xs bg-white outline-none focus:border-primary resize-none"
                    />
                  </div>

                  <div className="bg-cream/10 border border-cream rounded-xl p-3.5">
                    <label className="text-[10px] font-bold text-dark-gray block mb-1.5 uppercase tracking-wider">
                      {name}'s Perspective
                    </label>
                    <textarea
                      value={getValue(`${baseKey}_child`)}
                      onChange={(e) => updateField(`${baseKey}_child`, e.target.value)}
                      placeholder={`What was ${name}'s favorite part of the school year? What was hardest for them?`}
                      rows={3}
                      className="w-full border border-light-gray rounded-lg p-2.5 text-xs bg-white outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Goals for Next Year */}
        <div className="bg-white rounded-2xl p-6 border border-light-gray shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-cream pb-2">
            Looking Ahead: Goals for Next Year
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-bold text-dark-gray block mb-1.5 uppercase tracking-wider">
                Family & Home Goal
              </label>
              <textarea
                value={getValue('ref_next_family')}
                onChange={(e) => updateField('ref_next_family', e.target.value)}
                placeholder="Spiritual, relationship, travel, or home improvement goals..."
                rows={3}
                className="w-full border border-light-gray rounded-xl p-2.5 text-xs bg-cream/10 outline-none focus:border-primary resize-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-dark-gray block mb-1.5 uppercase tracking-wider">
                Academic Goals
              </label>
              <textarea
                value={getValue('ref_next_academic')}
                onChange={(e) => updateField('ref_next_academic', e.target.value)}
                placeholder="Core subjects, grade level adjustments, curricula targets..."
                rows={3}
                className="w-full border border-light-gray rounded-xl p-2.5 text-xs bg-cream/10 outline-none focus:border-primary resize-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-dark-gray block mb-1.5 uppercase tracking-wider">
                Lifestyle & Habit Goals
              </label>
              <textarea
                value={getValue('ref_next_lifestyle')}
                onChange={(e) => updateField('ref_next_lifestyle', e.target.value)}
                placeholder="Routines, sleep, screen-time, chore logs, morning baskets..."
                rows={3}
                className="w-full border border-light-gray rounded-xl p-2.5 text-xs bg-cream/10 outline-none focus:border-primary resize-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="text-xs font-semibold text-charcoal block mb-1.5 font-[Playfair_Display] italic">
              "This year we will always remember..."
            </label>
            <textarea
              value={getValue('ref_will_remember')}
              onChange={(e) => updateField('ref_will_remember', e.target.value)}
              placeholder="Capture the single most precious moment, funniest event, or overall theme of the year."
              rows={2}
              className="w-full border border-light-gray rounded-xl p-3 text-xs outline-none focus:border-primary resize-none bg-primary/5 font-medium text-primary font-[Poppins]"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
