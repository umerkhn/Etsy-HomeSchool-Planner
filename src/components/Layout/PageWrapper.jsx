import { generatePDF } from '../../utils/pdfGenerator';
import { usePlanner } from '../../context/PlannerContext';
import { totalPages } from '../../utils/pageRegistry';

export default function PageWrapper({ children, title, pageNum, colorBar }) {
  const { getValue } = usePlanner();
  const familyName = getValue('familyName', 'Family');

  return (
    <div className="animate-fade-in px-4 sm:px-6 lg:px-8 py-6">
      <article id="planner-content" className="page-wrapper max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-light-gray/40 overflow-hidden">
        {/* Color bar accent */}
        {colorBar && (
          <div
            className="child-color-bar h-1.5 w-full"
            style={{ background: colorBar }}
          />
        )}

        <div className="p-8 sm:p-12">
          {title && (
            <div className="mb-10">
              <h2 className="font-display text-3xl font-bold text-primary">
                {title}
              </h2>
              {pageNum && (
                <div className="text-xs text-medium-gray mt-1.5">Page {pageNum} of {totalPages}</div>
              )}
            </div>
          )}

          {children}
        </div>
      </article>

      {/* Sticky Glassmorphic PDF download footer */}
      <div className="pdf-button fixed bottom-6 right-6 z-20 no-print">
        <button
          onClick={() => generatePDF('planner-content', familyName)}
          className="glass-pdf-btn flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold active:scale-95"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
}
