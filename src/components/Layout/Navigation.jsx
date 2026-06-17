import { useLocation } from 'react-router-dom';
import { allPages, sections } from '../../utils/pageRegistry';
import SaveIndicator from '../Shared/SaveIndicator';
import { generatePDF } from '../../utils/pdfGenerator';
import { usePlanner } from '../../context/PlannerContext';
import { Button } from '../UI/Button';

export default function Navigation({ onMenuClick }) {
  const location = useLocation();
  const { getValue } = usePlanner();
  const familyName = getValue('familyName', 'Family');

  const currentPage = allPages.find((p) => p.path === location.pathname);
  const currentSection = sections.find((s) =>
    s.pages.some((p) => p.path === location.pathname)
  );

  return (
    <header className="h-14 sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-light-gray flex items-center justify-between px-4 lg:px-6 shrink-0">
      {/* Left: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-md hover:bg-cream text-medium-gray transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Breadcrumb (Notion style) */}
        <nav className="flex items-center gap-1.5 text-[13px]">
          <span className="text-medium-gray hidden sm:inline px-1 py-0.5 rounded hover:bg-cream cursor-default transition-colors">
            Workspace
          </span>
          {currentSection && (
            <>
              <span className="text-light-gray hidden sm:inline">/</span>
              <span className="text-medium-gray hidden sm:inline px-1 py-0.5 rounded hover:bg-cream cursor-default transition-colors">
                {currentSection.title}
              </span>
            </>
          )}
          {currentPage && (
            <>
              <span className="text-light-gray hidden sm:inline">/</span>
              <span className="text-charcoal font-medium px-1 py-0.5 rounded cursor-default">
                {currentPage.label}
              </span>
            </>
          )}
        </nav>
      </div>

      {/* Right: Actions + Save Indicator */}
      <div className="flex items-center gap-4">
        <SaveIndicator />
        
        <div className="h-4 w-px bg-light-gray hidden sm:block"></div>

        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => generatePDF('planner-content', familyName)}
          className="hidden sm:flex gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export PDF
        </Button>
      </div>
    </header>
  );
}
