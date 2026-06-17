import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { Card } from '../UI/Card';
import { INLINE_TEXTAREA_CLASS } from '../Forms/formStyles';

export default function ReflectionPage() {
  const { getValue, updateField, getChildName } = usePlanner();

  return (
    <PageWrapper 
      title="End-of-Year Reflection" 
      description="Reflect on the past academic year and set goals for the next."
    >
      <div className="space-y-12 animate-fade-in">
        
        {/* Overall Assessment */}
        <Card className="bg-cream/30 space-y-6">
          <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider border-b border-light-gray/60 pb-3 flex items-center gap-2">
            Overall Year Assessment
          </h3>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-teal uppercase tracking-wider block mb-2">
                What went WELL this year?
              </label>
              <textarea
                value={getValue('ref_well')}
                onChange={(e) => updateField('ref_well', e.target.value)}
                placeholder="Highlight key achievements, moments of joy, or successful routines..."
                rows={3}
                className={`${INLINE_TEXTAREA_CLASS} bg-white shadow-sm border border-transparent hover:border-teal/30 focus:border-teal focus:ring-teal/20`}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-coral uppercase tracking-wider block mb-2">
                What was CHALLENGING?
              </label>
              <textarea
                value={getValue('ref_challenging')}
                onChange={(e) => updateField('ref_challenging', e.target.value)}
                placeholder="Identify struggles, subjects that were difficult, schedule issues..."
                rows={3}
                className={`${INLINE_TEXTAREA_CLASS} bg-white shadow-sm border border-transparent hover:border-coral/30 focus:border-coral focus:ring-coral/20`}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-2">
                What would we do DIFFERENTLY?
              </label>
              <textarea
                value={getValue('ref_differently')}
                onChange={(e) => updateField('ref_differently', e.target.value)}
                placeholder="Key lessons learned, schedule adjustments, strategy shifts..."
                rows={3}
                className={`${INLINE_TEXTAREA_CLASS} bg-white shadow-sm`}
              />
            </div>
          </div>
        </Card>

        {/* Children Reflections */}
        <div className="space-y-8">
          {[1, 2, 3, 4].map((childIdx) => {
            const name = getChildName(childIdx) || `Student ${childIdx}`;
            const color = childColors[childIdx];
            const baseKey = `ref_c${childIdx}`;

            return (
              <Card key={childIdx} className="border-l-4" style={{ borderLeftColor: color.hex }}>
                <div className="flex items-center gap-3 mb-6 border-b border-light-gray/40 pb-4">
                  <div
                    className="w-8 h-8 rounded border border-light-gray shadow-sm flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: color.bg, color: color.hex }}
                  >
                    {childIdx}
                  </div>
                  <h3 className="font-bold text-charcoal text-base">{name}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-cream/20 border border-light-gray/60 rounded-xl p-4 shadow-sm">
                    <label className="text-[10px] font-bold text-medium-gray block mb-3 uppercase tracking-wider">
                      Parent's Perspective
                    </label>
                    <textarea
                      value={getValue(`${baseKey}_parent`)}
                      onChange={(e) => updateField(`${baseKey}_parent`, e.target.value)}
                      placeholder={`Describe ${name}'s emotional, academic, and behavioral growth...`}
                      rows={4}
                      className={`${INLINE_TEXTAREA_CLASS} bg-white`}
                    />
                  </div>

                  <div className="bg-cream/20 border border-light-gray/60 rounded-xl p-4 shadow-sm">
                    <label className="text-[10px] font-bold text-medium-gray block mb-3 uppercase tracking-wider">
                      {name}'s Perspective
                    </label>
                    <textarea
                      value={getValue(`${baseKey}_child`)}
                      onChange={(e) => updateField(`${baseKey}_child`, e.target.value)}
                      placeholder={`What was ${name}'s favorite part of the school year? What was hardest?`}
                      rows={4}
                      className={`${INLINE_TEXTAREA_CLASS} bg-white`}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Goals for Next Year */}
        <Card className="bg-charcoal text-white mt-12 space-y-6">
          <h3 className="text-[11px] font-bold text-white/70 uppercase tracking-wider border-b border-white/10 pb-3">
            Looking Ahead: Goals for Next Year
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-[10px] font-bold text-white/90 uppercase tracking-wider block mb-2">
                Family & Home Goal
              </label>
              <textarea
                value={getValue('ref_next_family')}
                onChange={(e) => updateField('ref_next_family', e.target.value)}
                placeholder="Spiritual, relationship, travel..."
                rows={3}
                className={`${INLINE_TEXTAREA_CLASS} bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/20`}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-white/90 uppercase tracking-wider block mb-2">
                Academic Goals
              </label>
              <textarea
                value={getValue('ref_next_academic')}
                onChange={(e) => updateField('ref_next_academic', e.target.value)}
                placeholder="Core subjects, curricula targets..."
                rows={3}
                className={`${INLINE_TEXTAREA_CLASS} bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/20`}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-white/90 uppercase tracking-wider block mb-2">
                Lifestyle & Habit Goals
              </label>
              <textarea
                value={getValue('ref_next_lifestyle')}
                onChange={(e) => updateField('ref_next_lifestyle', e.target.value)}
                placeholder="Routines, chores, morning baskets..."
                rows={3}
                className={`${INLINE_TEXTAREA_CLASS} bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/20`}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6">
            <label className="text-sm font-bold text-gold block mb-3 font-display italic">
              "This year we will always remember..."
            </label>
            <textarea
              value={getValue('ref_will_remember')}
              onChange={(e) => updateField('ref_will_remember', e.target.value)}
              placeholder="Capture the single most precious moment, funniest event, or overall theme of the year."
              rows={2}
              className={`${INLINE_TEXTAREA_CLASS} bg-gold/10 border border-gold/30 text-gold placeholder:text-gold/50 focus:bg-gold/20 focus:border-gold font-medium`}
            />
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
