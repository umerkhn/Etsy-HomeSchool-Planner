import { useMemo } from 'react';
import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';
import { INLINE_INPUT_CLASS, INLINE_TEXTAREA_CLASS } from '../Forms/formStyles';
import { Card } from '../UI/Card';

const ROWS = Array.from({ length: 15 }, (_, i) => i);
const CHILD_INDICES = [1, 2, 3, 4];

export default function ReadingLogPage() {
  const { getValue, updateField, getChildName } = usePlanner();

  const getTotals = (childIdx) => {
    let booksCount = 0;
    let pagesSum = 0;

    ROWS.forEach((rowIdx) => {
      const title = getValue(`read_title_c${childIdx}_r${rowIdx}`, '').trim();
      const pagesStr = getValue(`read_pages_c${childIdx}_r${rowIdx}`, '');

      if (title) {
        booksCount++;
        const p = parseInt(pagesStr, 10);
        if (!isNaN(p)) pagesSum += p;
      }
    });

    const completed = ROWS.filter((rowIdx) => getValue(`read_check_c${childIdx}_r${rowIdx}`, false) && getValue(`read_title_c${childIdx}_r${rowIdx}`, '').trim()).length;

    return { logged: booksCount, completed, pages: pagesSum };
  };

  return (
    <PageWrapper 
      title="Reading Log" 
      description="Track books read, page count, and reading levels for each student."
    >
      <div className="space-y-12">
        {CHILD_INDICES.map((childIdx) => {
          const name = getChildName(childIdx) || `Student ${childIdx}`;
          const color = childColors[childIdx];
          const totals = getTotals(childIdx);

          return (
            <Card key={childIdx} className="border-l-4 overflow-visible" style={{ borderLeftColor: color.hex }}>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-light-gray/40 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded border border-light-gray shadow-sm flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: color.bg, color: color.hex }}
                  >
                    {childIdx}
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-base">{name}</h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-xs font-bold font-mono">
                  <div className="bg-cream/40 rounded-lg px-3 py-1.5 border border-light-gray/60 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-medium-gray uppercase tracking-wider font-body">Logged:</span>
                    <span className="text-charcoal">{totals.logged}</span>
                  </div>
                  <div className="bg-teal/10 rounded-lg px-3 py-1.5 border border-teal/20 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-teal uppercase tracking-wider font-body">Completed:</span>
                    <span className="text-teal">{totals.completed}</span>
                  </div>
                  <div className="bg-charcoal text-white rounded-lg px-3 py-1.5 shadow-sm flex items-center gap-2">
                    <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider font-body">Pages:</span>
                    <span>{totals.pages}</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto max-h-[400px] overflow-y-auto border border-light-gray/60 rounded-xl custom-scrollbar shadow-sm">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="sticky top-0 bg-cream z-10 shadow-sm border-b border-light-gray/60">
                    <tr>
                      <th className="py-2.5 px-3 text-[10px] font-semibold text-medium-gray uppercase tracking-wider w-20">Date</th>
                      <th className="py-2.5 px-3 text-[10px] font-semibold text-medium-gray uppercase tracking-wider">Book Title</th>
                      <th className="py-2.5 px-3 text-[10px] font-semibold text-medium-gray uppercase tracking-wider">Author</th>
                      <th className="py-2.5 px-3 text-[10px] font-semibold text-medium-gray uppercase tracking-wider w-20 text-center">Pages</th>
                      <th className="py-2.5 px-3 text-[10px] font-semibold text-medium-gray uppercase tracking-wider w-20 text-center">Level</th>
                      <th className="py-2.5 px-4 text-[10px] font-semibold text-medium-gray uppercase tracking-wider w-12 text-center">✓</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light-gray/40">
                    {ROWS.map((rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-cream/30 transition-colors">
                        <td className="py-1 px-2 border-r border-light-gray/40">
                          <input
                            type="text"
                            value={getValue(`read_date_c${childIdx}_r${rowIdx}`)}
                            onChange={(e) => updateField(`read_date_c${childIdx}_r${rowIdx}`, e.target.value)}
                            placeholder="M/D"
                            className={`${INLINE_INPUT_CLASS} text-center font-mono`}
                          />
                        </td>
                        <td className="py-1 px-2">
                          <input
                            type="text"
                            value={getValue(`read_title_c${childIdx}_r${rowIdx}`)}
                            onChange={(e) => updateField(`read_title_c${childIdx}_r${rowIdx}`, e.target.value)}
                            placeholder="Title..."
                            className={`${INLINE_INPUT_CLASS} font-medium`}
                          />
                        </td>
                        <td className="py-1 px-2">
                          <input
                            type="text"
                            value={getValue(`read_author_c${childIdx}_r${rowIdx}`)}
                            onChange={(e) => updateField(`read_author_c${childIdx}_r${rowIdx}`, e.target.value)}
                            placeholder="Author..."
                            className={INLINE_INPUT_CLASS}
                          />
                        </td>
                        <td className="py-1 px-2 border-l border-light-gray/40">
                          <input
                            type="number"
                            value={getValue(`read_pages_c${childIdx}_r${rowIdx}`)}
                            onChange={(e) => updateField(`read_pages_c${childIdx}_r${rowIdx}`, e.target.value)}
                            placeholder="0"
                            className={`${INLINE_INPUT_CLASS} text-center font-mono`}
                          />
                        </td>
                        <td className="py-1 px-2 border-l border-light-gray/40">
                          <input
                            type="text"
                            value={getValue(`read_level_c${childIdx}_r${rowIdx}`)}
                            onChange={(e) => updateField(`read_level_c${childIdx}_r${rowIdx}`, e.target.value)}
                            placeholder="e.g. Lexile"
                            className={`${INLINE_INPUT_CLASS} text-center`}
                          />
                        </td>
                        <td className="py-1 px-4 text-center border-l border-light-gray/40 bg-cream/20">
                          <input
                            type="checkbox"
                            checked={!!getValue(`read_check_c${childIdx}_r${rowIdx}`, false)}
                            onChange={(e) => updateField(`read_check_c${childIdx}_r${rowIdx}`, e.target.checked)}
                            className="w-4 h-4 rounded border-light-gray text-charcoal focus:ring-charcoal/20 cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          );
        })}

        {/* Family Book Club */}
        <Card className="bg-cream/40">
          <h3 className="text-[11px] font-bold text-charcoal uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-light-gray/60 pb-3">
            📖 Family Book Club & Shared Reading
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Book Title</label>
              <input
                type="text"
                value={getValue('fb_title')}
                onChange={(e) => updateField('fb_title', e.target.value)}
                placeholder="Shared book title"
                className={`${INLINE_INPUT_CLASS} bg-white shadow-sm font-medium`}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Author</label>
              <input
                type="text"
                value={getValue('fb_author')}
                onChange={(e) => updateField('fb_author', e.target.value)}
                placeholder="Author name"
                className={`${INLINE_INPUT_CLASS} bg-white shadow-sm`}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Dates Read</label>
              <input
                type="text"
                value={getValue('fb_dates')}
                onChange={(e) => updateField('fb_dates', e.target.value)}
                placeholder="e.g. Oct 1 - Oct 25"
                className={`${INLINE_INPUT_CLASS} bg-white shadow-sm`}
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-medium-gray uppercase tracking-wider block mb-1.5">Discussion & Reading Notes</label>
            <textarea
              value={getValue('fb_notes')}
              onChange={(e) => updateField('fb_notes', e.target.value)}
              placeholder="Key takeaways, favorite sections, or questions discussed..."
              rows={4}
              className={`${INLINE_TEXTAREA_CLASS} bg-white shadow-sm`}
            />
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
