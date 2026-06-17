import { useParams } from 'react-router-dom';
import PageWrapper from '../Layout/PageWrapper';
import TextInput from '../Forms/TextInput';
import TextArea from '../Forms/TextArea';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { MONTHS } from '../../utils/pageRegistry';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';

export default function MonthlyOverviewPage() {
  const { month } = useParams();
  const { getChildName, getValue, updateField } = usePlanner();
  const m = MONTHS.find((x) => x.key === month) || MONTHS[0];

  return (
    <PageWrapper 
      title={`${m.label} Overview`} 
      description="Set your monthly theme, tracking goals, and outline weekly progress."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-3">
              Monthly Theme / Focus
            </h3>
            <TextInput field={`mo_${month}_theme`} placeholder="e.g. New Beginnings | Building Routines" />
          </Card>

          <Card>
            <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-4 flex items-center gap-2">
              Goals for {m.label}
            </h3>
            <div className="space-y-4">
              <TextArea field={`mo_${month}_familyGoal`} label="Family Goal" rows={2} />
              
              <div className="pt-3 border-t border-light-gray/40">
                <h4 className="text-[10px] font-bold text-medium-gray uppercase tracking-wider mb-3">Student Goals</h4>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: childColors[i].hex }} />
                      <TextArea
                        field={`mo_${month}_childGoal_${i}`}
                        label={getChildName(i) || `Student ${i}`}
                        rows={2}
                        placeholder="Primary focus"
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-3">
              Monthly Notes
            </h3>
            <TextArea field={`mo_${month}_notes`} placeholder="Observations, things to carry over..." rows={4} />
          </Card>
        </div>

        {/* Right Col */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Weekly Schedule */}
          <Card className="bg-cream/20">
            <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-4">
              Weekly Outline
            </h3>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((w) => (
                <div key={w} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-3 bg-white border border-light-gray/60 rounded-lg shadow-sm">
                  <div className="w-16">
                    <Badge variant="primary">Week {w}</Badge>
                  </div>
                  <div className="flex-1 w-full">
                    <TextInput field={`mo_${month}_w${w}_theme`} placeholder="Theme/Unit" className="w-full" />
                  </div>
                  <div className="flex-1 w-full border-t border-light-gray/40 sm:border-t-0 sm:border-l sm:pl-3 pt-3 sm:pt-0">
                    <TextInput field={`mo_${month}_w${w}_focus`} placeholder="Focus area" className="w-full" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Curriculum Progress */}
          <Card noPadding>
            <div className="p-4 border-b border-light-gray/60">
              <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider">
                Curriculum Progress Check
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-cream/50 border-b border-light-gray/60">
                  <tr>
                    <th className="py-2.5 px-4 text-[10px] font-semibold text-medium-gray uppercase tracking-wider">Student</th>
                    {['Math', 'ELA', 'Science', 'History'].map((s) => (
                      <th key={s} className="py-2.5 px-3 text-[10px] font-semibold text-medium-gray uppercase tracking-wider text-center">{s}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-gray/40">
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i} className="hover:bg-cream/30 transition-colors">
                      <td className="py-2.5 px-4">
                        <Badge variant="gray" className="gap-1.5" style={{ backgroundColor: childColors[i].bg, borderColor: childColors[i].hex, color: childColors[i].hex }}>
                          {getChildName(i) || `Student ${i}`}
                        </Badge>
                      </td>
                      {['math', 'ela', 'science', 'history'].map((s) => (
                        <td key={s} className="py-2.5 px-3 text-center border-l border-light-gray/40 first:border-l-0">
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <input
                              type="checkbox"
                              checked={!!getValue(`mo_${month}_c${i}_${s}_check`, false)}
                              onChange={(e) => updateField(`mo_${month}_c${i}_${s}_check`, e.target.checked)}
                              className="w-4 h-4 rounded border-light-gray text-charcoal focus:ring-charcoal/20 cursor-pointer"
                            />
                            <div className="flex items-center gap-0.5">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={getValue(`mo_${month}_c${i}_${s}_pct`, '')}
                                onChange={(e) => updateField(`mo_${month}_c${i}_${s}_pct`, e.target.value)}
                                placeholder="0"
                                className="w-8 border-b border-transparent hover:border-light-gray focus:border-dark-gray px-1 py-0.5 text-[10px] font-mono text-center outline-none bg-transparent transition-colors"
                              />
                              <span className="text-[10px] text-medium-gray">%</span>
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
        </div>
      </div>
    </PageWrapper>
  );
}
