import PageWrapper from '../Layout/PageWrapper';
import { usePlanner } from '../../context/PlannerContext';
import { childColors } from '../../utils/colorSystem';

export default function ReadingLogPage() {
  const { getValue, updateField, getChildName } = usePlanner();

  const ROWS = Array.from({ length: 15 }, (_, i) => i);

  // Calculate totals for a child
  const getTotals = (childIdx) => {
    let booksCount = 0;
    let pagesSum = 0;

    ROWS.forEach((rowIdx) => {
      const title = getValue(`read_title_c${childIdx}_r${rowIdx}`, '').trim();
      const pagesStr = getValue(`read_pages_c${childIdx}_r${rowIdx}`, '');
      const checked = getValue(`read_check_c${childIdx}_r${rowIdx}`, false);

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
    <PageWrapper title="Reading Log 2025–2026" pageNum={59}>
      <div className="space-y-12">
        {[1, 2, 3, 4].map((childIdx) => {
          const name = getChildName(childIdx);
          const color = childColors[childIdx];
          const totals = getTotals(childIdx);

          return (
            <div
              key={childIdx}
              className="bg-white rounded-2xl p-6 border-l-4 shadow-sm border-light-gray"
              style={{ borderLeftColor: color.hex }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-charcoal">{name}</h3>
                  <p className="text-xs text-medium-gray mt-0.5">
                    Track books read, page count, and reading levels
                  </p>
                </div>

                {/* Auto-calculated totals */}
                <div className="flex gap-3 text-xs font-semibold">
                  <div className="bg-cream rounded-xl px-3 py-2 text-center border border-light-gray">
                    <span className="text-medium-gray block font-normal text-[10px] uppercase">Books Logged</span>
                    <span className="text-charcoal font-bold text-sm">{totals.logged}</span>
                  </div>
                  <div className="bg-teal/10 rounded-xl px-3 py-2 text-center border border-teal/10">
                    <span className="text-teal block font-normal text-[10px] uppercase">Completed (✓)</span>
                    <span className="text-teal font-bold text-sm">{totals.completed}</span>
                  </div>
                  <div className="bg-primary/10 rounded-xl px-3 py-2 text-center border border-primary/10">
                    <span className="text-primary block font-normal text-[10px] uppercase">Total Pages</span>
                    <span className="text-primary font-bold text-sm">{totals.pages}</span>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto max-h-[350px] overflow-y-auto pr-1 border border-cream rounded-xl">
                <table className="w-full text-sm text-left">
                  <thead className="sticky top-0 bg-white shadow-sm z-10">
                    <tr className="border-b border-light-gray">
                      <th className="py-2 px-2 text-xs font-semibold text-dark-gray w-24">Date</th>
                      <th className="py-2 px-2 text-xs font-semibold text-dark-gray">Book Title</th>
                      <th className="py-2 px-2 text-xs font-semibold text-dark-gray">Author</th>
                      <th className="py-2 px-2 text-xs font-semibold text-dark-gray w-20">Pages</th>
                      <th className="py-2 px-2 text-xs font-semibold text-dark-gray w-24">Level</th>
                      <th className="py-2 px-2 text-xs font-semibold text-dark-gray text-center w-10">✓</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((rowIdx) => (
                      <tr key={rowIdx} className="border-b border-cream hover:bg-cream/20 transition-colors">
                        <td className="py-1 px-1">
                          <input
                            type="text"
                            value={getValue(`read_date_c${childIdx}_r${rowIdx}`)}
                            onChange={(e) => updateField(`read_date_c${childIdx}_r${rowIdx}`, e.target.value)}
                            placeholder="M/D"
                            className="w-full border border-light-gray rounded px-1.5 py-1 text-xs outline-none focus:border-primary text-center font-normal"
                          />
                        </td>
                        <td className="py-1 px-1">
                          <input
                            type="text"
                            value={getValue(`read_title_c${childIdx}_r${rowIdx}`)}
                            onChange={(e) => updateField(`read_title_c${childIdx}_r${rowIdx}`, e.target.value)}
                            placeholder="Book title"
                            className="w-full border border-light-gray rounded px-2.5 py-1 text-xs outline-none focus:border-primary font-medium"
                          />
                        </td>
                        <td className="py-1 px-1">
                          <input
                            type="text"
                            value={getValue(`read_author_c${childIdx}_r${rowIdx}`)}
                            onChange={(e) => updateField(`read_author_c${childIdx}_r${rowIdx}`, e.target.value)}
                            placeholder="Author name"
                            className="w-full border border-light-gray rounded px-2 py-1 text-xs outline-none focus:border-primary"
                          />
                        </td>
                        <td className="py-1 px-1">
                          <input
                            type="number"
                            value={getValue(`read_pages_c${childIdx}_r${rowIdx}`)}
                            onChange={(e) => updateField(`read_pages_c${childIdx}_r${rowIdx}`, e.target.value)}
                            placeholder="120"
                            className="w-full border border-light-gray rounded px-2 py-1 text-xs outline-none focus:border-primary text-center"
                          />
                        </td>
                        <td className="py-1 px-1">
                          <input
                            type="text"
                            value={getValue(`read_level_c${childIdx}_r${rowIdx}`)}
                            onChange={(e) => updateField(`read_level_c${childIdx}_r${rowIdx}`, e.target.value)}
                            placeholder="e.g. Lexile"
                            className="w-full border border-light-gray rounded px-2 py-1 text-xs outline-none focus:border-primary text-center"
                          />
                        </td>
                        <td className="py-1 px-1 text-center">
                          <input
                            type="checkbox"
                            checked={!!getValue(`read_check_c${childIdx}_r${rowIdx}`, false)}
                            onChange={(e) => updateField(`read_check_c${childIdx}_r${rowIdx}`, e.target.checked)}
                            className="w-4 h-4 accent-primary"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* Family Book Club */}
        <div className="bg-cream rounded-2xl p-6 border border-light-gray">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            📖 Family Book Club & Shared Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-medium text-dark-gray block mb-1">Book Title</label>
              <input
                type="text"
                value={getValue('fb_title')}
                onChange={(e) => updateField('fb_title', e.target.value)}
                placeholder="Shared book title"
                className="w-full border border-light-gray rounded-xl px-4 py-2 text-xs outline-none focus:border-primary bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-dark-gray block mb-1">Author</label>
              <input
                type="text"
                value={getValue('fb_author')}
                onChange={(e) => updateField('fb_author', e.target.value)}
                placeholder="Author name"
                className="w-full border border-light-gray rounded-xl px-4 py-2 text-xs outline-none focus:border-primary bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-dark-gray block mb-1">Dates Read</label>
              <input
                type="text"
                value={getValue('fb_dates')}
                onChange={(e) => updateField('fb_dates', e.target.value)}
                placeholder="e.g., Oct 1 - Oct 25"
                className="w-full border border-light-gray rounded-xl px-4 py-2 text-xs outline-none focus:border-primary bg-white"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-dark-gray block mb-1">Discussion & Reading Notes</label>
            <textarea
              value={getValue('fb_notes')}
              onChange={(e) => updateField('fb_notes', e.target.value)}
              placeholder="What questions did you discuss? What were key takeaways or favorite sections?"
              rows={4}
              className="w-full border border-light-gray rounded-xl p-3 text-xs bg-white outline-none focus:border-primary resize-none"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
