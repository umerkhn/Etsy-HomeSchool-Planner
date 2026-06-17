import PageWrapper from '../Layout/PageWrapper';
import TextArea from '../Forms/TextArea';
import TextInput from '../Forms/TextInput';

export default function MissionPage() {
  return (
    <PageWrapper title="Mission Statement & Family Goals" pageNum={3}>
      <div className="space-y-8">
        {/* Mission Statement */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-3">
            Our Family's Homeschool Mission
          </h3>
          <TextArea
            field="missionStatement"
            placeholder="What is your family's homeschool mission? What do you hope to achieve?"
            rows={6}
          />
        </div>

        <hr className="border-light-gray" />

        {/* Why We Homeschool */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-3">
            Why We Homeschool
          </h3>
          <TextArea
            field="whyHomeschool"
            placeholder="What inspired your family to homeschool? What are the driving reasons?"
            rows={5}
          />
        </div>

        <hr className="border-light-gray" />

        {/* Core Values */}
        <div>
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-3">
            Core Values for This Year
          </h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {num}
                </span>
                <TextInput
                  field={`coreValue${num}`}
                  placeholder={`Core value ${num}`}
                  className="flex-1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
