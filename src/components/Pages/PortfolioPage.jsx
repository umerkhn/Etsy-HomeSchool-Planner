import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';

export default function PortfolioPage() {
  const { getValue, updateField, getChildName } = usePlanner();

  const handleImageUpload = (childIdx, e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convert file to Base64 (or prompt to paste a URL)
    const reader = new FileReader();
    reader.onloadend = () => {
      // Store Base64 string in state
      updateField(`portfolio_img_c${childIdx}`, reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <PageWrapper title="Student Milestones & Memories" pageNum={64}>
      <div className="space-y-16">
        {[1, 2, 3, 4].map((childIdx) => {
          const name = getChildName(childIdx);
          const color = childColors[childIdx];
          const imageSrc = getValue(`portfolio_img_c${childIdx}`, '');

          return (
            <div
              key={childIdx}
              className="bg-white rounded-2xl p-6 border-l-4 shadow-sm border-light-gray"
              style={{ borderLeftColor: color.hex }}
            >
              <div className="mb-6">
                <h3 className="text-lg font-bold text-charcoal">{name}</h3>
                <p className="text-xs text-medium-gray mt-0.5">
                  A keepsake page to document milestones, memories, and accomplishments
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Text fields - 3 columns on desktop */}
                <div className="md:col-span-3 space-y-4">
                  <div>
                    <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                      Achievement Highlights This Year
                    </label>
                    <textarea
                      value={getValue(`port_highlights_c${childIdx}`)}
                      onChange={(e) => updateField(`port_highlights_c${childIdx}`, e.target.value)}
                      placeholder="Write about the major accomplishments and big wins this year..."
                      rows={3}
                      className="w-full border border-light-gray rounded-xl p-3 text-xs outline-none focus:border-primary resize-none bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                        Skills Mastered
                      </label>
                      <textarea
                        value={getValue(`port_skills_c${childIdx}`)}
                        onChange={(e) => updateField(`port_skills_c${childIdx}`, e.target.value)}
                        placeholder="Academic or practical skills acquired..."
                        rows={2}
                        className="w-full border border-light-gray rounded-xl p-2 text-xs outline-none focus:border-primary resize-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                        Favorite Lesson / Project
                      </label>
                      <textarea
                        value={getValue(`port_fav_lesson_c${childIdx}`)}
                        onChange={(e) => updateField(`port_fav_lesson_c${childIdx}`, e.target.value)}
                        placeholder="What did they enjoy learning the most?"
                        rows={2}
                        className="w-full border border-light-gray rounded-xl p-2 text-xs outline-none focus:border-primary resize-none bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                        Growth Areas
                      </label>
                      <textarea
                        value={getValue(`port_growth_c${childIdx}`)}
                        onChange={(e) => updateField(`port_growth_c${childIdx}`, e.target.value)}
                        placeholder="Where was the biggest development seen?"
                        rows={2}
                        className="w-full border border-light-gray rounded-xl p-2 text-xs outline-none focus:border-primary resize-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-dark-gray block mb-1">
                        Memorable Moment
                      </label>
                      <textarea
                        value={getValue(`port_moment_c${childIdx}`)}
                        onChange={(e) => updateField(`port_moment_c${childIdx}`, e.target.value)}
                        placeholder="Field trip, funny story, breakthrough..."
                        rows={2}
                        className="w-full border border-light-gray rounded-xl p-2 text-xs outline-none focus:border-primary resize-none bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Photo frame - 2 columns on desktop */}
                <div className="md:col-span-2 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-semibold text-dark-gray block mb-2 self-start md:self-center">
                    Annual Memory Photo
                  </span>

                  <div className="border-4 border-double border-light-gray bg-cream rounded-2xl p-4 w-full max-w-[240px] aspect-square flex flex-col items-center justify-center relative overflow-hidden group shadow-inner">
                    {imageSrc ? (
                      <>
                        <img
                          src={imageSrc}
                          alt={`${name} memory`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => updateField(`portfolio_img_c${childIdx}`, '')}
                          className="absolute top-2 right-2 bg-coral text-white p-1 rounded-full text-xs shadow hover:scale-105 transition-transform"
                          title="Remove Photo"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <svg
                          className="w-8 h-8 mx-auto text-medium-gray mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-[10px] text-dark-gray font-medium block">
                          No photo selected
                        </span>
                        <span className="text-[9px] text-medium-gray block mt-0.5">
                          Drag & drop or click below
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2 w-full max-w-[240px]">
                    <label className="flex-1 bg-primary text-white text-center rounded-xl py-2 text-xs font-semibold cursor-pointer hover:bg-primary-light active:scale-95 transition-all shadow-sm">
                      Upload File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(childIdx, e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
