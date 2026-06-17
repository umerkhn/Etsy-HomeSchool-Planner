import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { Card } from '../UI/Card';
import { INLINE_TEXTAREA_CLASS } from '../Forms/formStyles';

export default function PortfolioPage() {
  const { getValue, updateField, getChildName } = usePlanner();

  const handleImageUpload = (childIdx, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      updateField(`portfolio_img_c${childIdx}`, reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <PageWrapper 
      title="Portfolio & Memories" 
      description="Document milestones, major projects, and special memories for the year."
    >
      <div className="space-y-12">
        {[1, 2, 3, 4].map((childIdx) => {
          const name = getChildName(childIdx) || `Student ${childIdx}`;
          const color = childColors[childIdx];
          const imageSrc = getValue(`portfolio_img_c${childIdx}`, '');

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

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Text fields - 3 columns on desktop */}
                <div className="md:col-span-3 space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-charcoal uppercase tracking-wider block mb-2">
                      Achievement Highlights
                    </label>
                    <textarea
                      value={getValue(`port_highlights_c${childIdx}`)}
                      onChange={(e) => updateField(`port_highlights_c${childIdx}`, e.target.value)}
                      placeholder="Major accomplishments and big wins..."
                      rows={3}
                      className={`${INLINE_TEXTAREA_CLASS} bg-cream/30 shadow-sm border border-light-gray/40 hover:border-light-gray`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-2">
                        Skills Mastered
                      </label>
                      <textarea
                        value={getValue(`port_skills_c${childIdx}`)}
                        onChange={(e) => updateField(`port_skills_c${childIdx}`, e.target.value)}
                        placeholder="Academic or practical skills..."
                        rows={3}
                        className={`${INLINE_TEXTAREA_CLASS} bg-cream/30 shadow-sm border border-light-gray/40 hover:border-light-gray`}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-2">
                        Favorite Projects
                      </label>
                      <textarea
                        value={getValue(`port_fav_lesson_c${childIdx}`)}
                        onChange={(e) => updateField(`port_fav_lesson_c${childIdx}`, e.target.value)}
                        placeholder="What did they enjoy learning the most?"
                        rows={3}
                        className={`${INLINE_TEXTAREA_CLASS} bg-cream/30 shadow-sm border border-light-gray/40 hover:border-light-gray`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-2">
                        Growth Areas
                      </label>
                      <textarea
                        value={getValue(`port_growth_c${childIdx}`)}
                        onChange={(e) => updateField(`port_growth_c${childIdx}`, e.target.value)}
                        placeholder="Where was the biggest development seen?"
                        rows={3}
                        className={`${INLINE_TEXTAREA_CLASS} bg-cream/30 shadow-sm border border-light-gray/40 hover:border-light-gray`}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-2">
                        Memorable Moments
                      </label>
                      <textarea
                        value={getValue(`port_moment_c${childIdx}`)}
                        onChange={(e) => updateField(`port_moment_c${childIdx}`, e.target.value)}
                        placeholder="Funny story, breakthrough, event..."
                        rows={3}
                        className={`${INLINE_TEXTAREA_CLASS} bg-cream/30 shadow-sm border border-light-gray/40 hover:border-light-gray`}
                      />
                    </div>
                  </div>
                </div>

                {/* Photo frame - 2 columns on desktop */}
                <div className="md:col-span-2 flex flex-col items-center justify-center bg-cream/20 rounded-2xl p-6 border border-light-gray/40">
                  <span className="text-[10px] font-bold text-charcoal uppercase tracking-wider block mb-4 text-center">
                    Memory Photo
                  </span>

                  <div className="border border-light-gray bg-white rounded-xl p-2 w-full max-w-[240px] aspect-square flex flex-col items-center justify-center relative overflow-hidden group shadow-sm">
                    {imageSrc ? (
                      <>
                        <img
                          src={imageSrc}
                          alt={`${name} memory`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => updateField(`portfolio_img_c${childIdx}`, '')}
                          className="absolute top-3 right-3 bg-white/90 text-coral p-1.5 rounded-full text-xs shadow-sm hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
                          title="Remove Photo"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg
                            className="w-5 h-5 text-medium-gray"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-xs text-dark-gray font-bold block mb-1">
                          No photo added
                        </span>
                        <span className="text-[10px] text-medium-gray block">
                          Upload a favorite memory from this year.
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 w-full max-w-[240px]">
                    <label className="block w-full bg-charcoal text-white text-center rounded-lg py-2.5 text-[11px] font-bold uppercase tracking-wider cursor-pointer hover:bg-black active:scale-95 transition-all shadow-sm">
                      Select Image
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
            </Card>
          );
        })}
      </div>
    </PageWrapper>
  );
}
