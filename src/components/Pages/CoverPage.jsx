import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';

export default function CoverPage() {
  const { getValue, updateField } = usePlanner();

  return (
    <div className="min-h-[85vh] flex animate-fade-in">
      {/* Left gradient bar */}
      <div className="hidden md:block w-[40%] bg-gradient-to-b from-primary via-primary-dark to-primary rounded-l-2xl relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-12 right-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute top-28 right-16 w-20 h-20 rounded-full bg-white/5" />
        <div className="absolute bottom-20 left-8 w-24 h-24 rounded-full bg-white/5" />
        <div className="absolute bottom-40 left-20 w-16 h-16 rounded-full bg-white/8" />

        {/* Watercolor-style decorative element */}
        <div className="absolute top-6 right-6 w-20 h-20 opacity-20">
          <svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="30" r="8" fill="#E8A89D" />
            <circle cx="35" cy="50" r="6" fill="#A8D4B8" />
            <circle cx="65" cy="50" r="7" fill="#E8C8A0" />
            <circle cx="50" cy="70" r="5" fill="#D4B8E8" />
            <circle cx="50" cy="50" r="10" fill="white" opacity="0.3" />
          </svg>
        </div>

        <div className="absolute bottom-10 left-8 right-8 text-white/60 text-xs">
          <p>Created with care for homeschooling families</p>
        </div>
      </div>

      {/* Right content area */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-12 bg-white rounded-r-2xl">
        <div className="max-w-md mx-auto w-full">
          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-3">
            Ultimate<br />Homeschool<br />Planner
          </h1>
          <p className="text-lg text-dark-gray font-light mb-10">
            2025–2026 | Organize. Plan. <span className="text-primary font-medium">Thrive.</span>
          </p>

          {/* Color dots */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: childColors[i].hex }}
              />
            ))}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-dark-gray mb-1 block">Family Name</label>
              <input
                type="text"
                value={getValue('familyName')}
                onChange={(e) => updateField('familyName', e.target.value)}
                placeholder="Enter your family name"
                className="w-full border border-light-gray rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-dark-gray mb-1 block">Contact Email</label>
              <input
                type="email"
                value={getValue('contactEmail')}
                onChange={(e) => updateField('contactEmail', e.target.value)}
                placeholder="email@example.com"
                className="w-full border border-light-gray rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-dark-gray mb-1 block">Start Date</label>
              <input
                type="date"
                value={getValue('startDate')}
                onChange={(e) => updateField('startDate', e.target.value)}
                className="w-full border border-light-gray rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
            </div>

            {/* Children */}
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-charcoal mb-3">Children</h3>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex gap-3 items-center mb-3 pl-3 border-l-3"
                  style={{ borderColor: childColors[i].hex }}
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      value={getValue(`child${i}Name`)}
                      onChange={(e) => updateField(`child${i}Name`, e.target.value)}
                      placeholder={`Child ${i} name`}
                      className="w-full border border-light-gray rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    />
                  </div>
                  <div className="w-20">
                    <input
                      type="text"
                      value={getValue(`child${i}Age`)}
                      onChange={(e) => updateField(`child${i}Age`, e.target.value)}
                      placeholder="Age"
                      className="w-full border border-light-gray rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-center"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
