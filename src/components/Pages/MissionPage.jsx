import PageWrapper from '../Layout/PageWrapper';
import TextArea from '../Forms/TextArea';
import TextInput from '../Forms/TextInput';
import { Card } from '../UI/Card';

export default function MissionPage() {
  return (
    <PageWrapper 
      title="Mission Statement & Family Goals"
      description="Define your family's core values, 'why', and high-level mission for the year."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4">
              Homeschool Mission
            </h3>
            <TextArea
              field="missionStatement"
              placeholder="What is your family's homeschool mission? What do you hope to achieve by the end of this academic year?"
              rows={5}
            />
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4">
              Why We Homeschool
            </h3>
            <TextArea
              field="whyHomeschool"
              placeholder="What inspired your family to homeschool? Write down your driving reasons to look back on during hard days."
              rows={4}
            />
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">
                Core Values
              </h3>
              <p className="text-xs text-medium-gray mt-1">Guiding principles for this year</p>
            </div>
            
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-cream border border-light-gray text-dark-gray text-xs font-bold flex items-center justify-center shrink-0">
                    {num}
                  </div>
                  <TextInput
                    field={`coreValue${num}`}
                    placeholder={`Core value ${num}`}
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </PageWrapper>
  );
}
